import React from 'react';
import { Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";

// Components
import Step from './step';
import Cover from './cover';
import Basic from './basic';
import Freight from './freight';
import Format from './format';
import Depiction from './depiction';

// Modules
import Confirm from '../../../../../../module/confirm';

// Actions
import { createProduct, quota, deleteProduct } from '../../../../../../actions/myvendor';
import { categories } from '../../../../../../actions/common';

//Lang
import lang from '../../../../../../public/lang/lang.json';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            popupMsg: "",
            maxStep: 5,
            step: 1,
            id: "",
            categoriesItem: [],
            profile: props.profile
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            profile: props.profile
        }
    }

    render(){

        const { loading, open, popupMsg, id, step,  categoriesItem } = this.state;

        return(
            <React.Fragment>
                <Helmet encodeSpecialCharacters={false}>
                    <title>{`網紅電商廠商管理介面 - 新增商品`}</title>
                </Helmet>
                <section className="page-title">
                    <h3>{lang['zh-TW']['Product addition']}</h3>
                </section>
                <Step 
                    maxStep= { this.state.maxStep }
                    step= { this.state.step }
                />

                <section className="admin-content-row">
                    {
                        step==1 &&
                            // 基本
                            <Basic 
                                step= {step}
                                categoriesItem={categoriesItem} 
                                returnSuccess={ this.success.bind(this) }
                                returnCancel={this.handleCancel.bind(this)}
                                returnError={this.error.bind(this)}
                            />
                    }
                    {
                        step==2 &&
                            // 主圖
                            <Cover 
                                step= {step}
                                id={id}
                                returnSuccess={ this.success.bind(this) }
                                returnCancel={this.handleCancel.bind(this)}
                                returnError={this.error.bind(this)}
                            />
                    }
                    {
                        step==3 &&
                            // 規格
                            <Format 
                                step= {step}
                                id={id}
                                returnSuccess={ this.success.bind(this) }
                                returnCancel={this.handleCancel.bind(this)}
                                returnError={this.error.bind(this)}
                            />
                    }
                    {
                        step==4 &&
                            // 敘述
                            <Depiction
                                step= {step}
                                id={id}
                                returnSuccess={ this.success.bind(this) }
                                returnCancel={this.handleCancel.bind(this)}
                                returnError={this.error.bind(this)}
                            />
                    }
                    {
                        step==5 &&
                            // 運送方式
                            <Freight 
                                step= {step}
                                id={id}
                                returnSuccess={ this.success.bind(this) }
                                returnCancel={this.handleCancel.bind(this)}
                                returnError={this.error.bind(this)}
                            />
                    }
                </section>
                <Confirm
                    open={open}
                    method='alert'
                    container={popupMsg}
                    onCancel={this.handleConfirm.bind(this)}
                />
                <Prompt when={true} message={ location => {
                    location.pathname.startsWith("/myvendor/products/create")? (
                        true
                    ):(
                        this.onUnload()
                    )
                }}/>
            </React.Fragment>
        );
    }

    componentDidMount() {
        // window.addEventListener("beforeunload", this.onUnload);
        // 取得類別
        this.props.dispatch( categories() ).then(res=>{
            this.setState({
                categoriesItem: res['data']
            })
        });
    }

    componentDidUpdate(prevProps, prevState) {

        const { history } = this.props;
        const { profile } = this.state;
        // 檢查配額
        if( profile['remainQuantity']<=0 ){
            history.push({
                pathname: '/myvendor/planform/list'
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload);
    }

    handleConfirm = ( val ) => {
        this.setState({
            open: false,
            success: val
        },()=>{
            this.handleCancel();
        })
    }

    handleCancel = () => {
        this.props.history.push('/myvendor/products/list');
    }

    onUnload = (e) => {
        const { history } = this.props;
        const { id, step, profile } = this.state;
        if( step>1 && step<5 ){
            for( let i=1 ; i<=5 ; i++ ){
                sessionStorage.removeItem(`productCreateStep${i}`);
            }
            this.props.dispatch( deleteProduct(id) ).then( res => {
                switch( res['status'] ){
                    case 200:
                        this.props.dispatch( quota('sum',profile) );
                        break;

                    default:
                        break;
                }
            })
        }
        let confirmationMessage = '你正在離開該頁面，我們將會刪除為完成資料！';
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    }

    success = ( val ) => {
        if( !val.hasOwnProperty('status') ){
            const { id, step } = val;
            const { profile } = this.state;
            if( val.hasOwnProperty('id') ){
                if( step=='2' ){
                    this.props.dispatch( quota('less',profile) );
                }
                this.setState({
                    step,
                    id
                })
            }else{
                this.setState({
                    step
                })
            }
        }else{
            const { profile } = this.state;
            this.setState({
                open: true,
                popupMsg: '新增成功'
            })
        }
    } 

    error = ( val ) => {
    }
}

const mapStateToProps = state => {
    return{
        profile: state.myvendor.info
    }
}

export default connect(mapStateToProps)(Index);