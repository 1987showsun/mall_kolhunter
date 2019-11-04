import React                                   from 'react';
import queryString                             from 'query-string';
import { Prompt }                              from 'react-router-dom';
import { connect }                             from 'react-redux';
import { Helmet }                              from "react-helmet";

// Components
import Step                                    from './step';
import Cover                                   from './cover';
import Basic                                   from './basic';
import Freight                                 from './freight';
import Format                                  from './format';
import Depiction                               from './depiction';

// Modules
import Confirm                                 from '../../../../../../module/confirm';

// Actions
import { vinfo, deleteProduct }                from '../../../../../../actions/myvendor';
import { categories }                          from '../../../../../../actions/common';

//Lang
import lang                                    from '../../../../../../public/lang/lang.json';

class Index extends React.Component{

    constructor(props){
        super(props);
        const { location } = props;
        const { search }   = location;
        const id           = sessionStorage.getItem('createProductId');
        const step         = queryString.parse(search)['step'] || 1;
        this.state = {
            open             : false,
            popupMsg         : "",
            maxStep          : 5,
            step             : step,
            id               : id!=undefined? id : '',
            categoriesItem   : [],
            profile          : props.profile
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            profile          : props.profile
        }
    }

    render(){

        const { open, popupMsg, id, step, categoriesItem } = this.state;

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
                    open      = {open}
                    method    = 'alert'
                    container = {popupMsg}
                    onCancel  = {this.handleConfirm.bind(this)}
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
        if( profile['remainQuantity']<0 ){
            history.push({
                pathname: '/myvendor/planform/list'
            })
        }
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
        const { id, step } = this.state;
        sessionStorage.removeItem('createProductId');
        for( let i=1 ; i<=5 ; i++ ){
            sessionStorage.removeItem(`createProductStep${i}`);
        }
        if( step>1 && step<5 ){
            this.props.dispatch( deleteProduct(id) ).then( res => {
                switch( res['status'] ){
                    case 200:
                        this.props.dispatch( vinfo() );
                        break;

                    default:
                        break;
                }
            })
        }
    }

    success = ( val ) => {
        if( !val.hasOwnProperty('status') ){
            const { history, location }  = this.props;
            const { pathname, search }   = location;
            const { step } = val;
            if( val.hasOwnProperty('id') ){
                const { id } = val;
                if( step=='2' ){
                    this.props.dispatch( vinfo() );
                }
                this.setState({
                    step,
                    id
                },()=>{
                    history.push({
                        pathname,
                        search: queryString.stringify({ ...queryString.parse(search), id, step })
                    })
                })
            }else{           
                this.setState({
                    step
                },()=>{
                    history.push({
                        pathname,
                        search: queryString.stringify({ ...queryString.parse(search), step })
                    })
                })
            }
        }else{
            this.setState({
                open     : true,
                popupMsg : '新增成功'
            },()=>{
                Object.keys(sessionStorage).map( keys => {
                    if( keys.indexOf('createProduct')>=0 ){
                        sessionStorage.removeItem(keys);
                    }
                })
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