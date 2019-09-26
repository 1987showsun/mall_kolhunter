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
import Loading from '../../../../../../module/loading';
import Confirm from '../../../../../../module/confirm';

// Actions
import { createProduct, quota } from '../../../../../../actions/myvendor';
import { categories } from '../../../../../../actions/common';

//Lang
import lang from '../../../../../../public/lang/lang.json';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            open: false,
            popupMsg: "",
            noteMSG: [],
            maxStep: 5,
            step: 1,
            id: "",
            formObject: {},
            categoriesItem: [],
            required: {
                1: ['name','categories','price'],
                2: ['images'],
                3: ['spec'],
                4: ['descriptions'],
                5: ['deliveries']
            },
            profile: props.profile
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            profile: props.profile
        }
    }

    render(){

        const { location, match } = this.props;
        const { loading, open, noteMSG, popupMsg, id, formObject, step,  categoriesItem } = this.state;

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

                <form className="create-form" onSubmit={this.handleSubmit.bind(this)}>
                    <Loading loading={loading} />
                    {
                        step==1 &&
                            // 基本
                            <Basic 
                                categoriesItem={categoriesItem} 
                                data={ formObject[step]==undefined? null:formObject[step] } 
                                onHandleChange={this.handleChange.bind(this)}
                            />
                    }
                    {
                        step==2 &&
                            // 主圖
                            <Cover 
                                id={id} 
                                data={ formObject[step]==undefined? null:formObject[step]['images'] } 
                                onHandleChange={this.handleChange.bind(this)}
                            />
                    }
                    {
                        step==3 &&
                            // 規格
                            <Format 
                                data={ formObject[step]==undefined? []:formObject[step]['spec'] } 
                                onHandleChange={this.handleChange.bind(this)}
                            />
                    }
                    {
                        step==4 &&
                            // 敘述
                            <Depiction
                                data={ formObject[step]==undefined? []:formObject[step]['descriptions'] } 
                                onHandleChange={this.handleChange.bind(this)}
                            />
                    }
                    {
                        step==5 &&
                            // 運送方式
                            <Freight 
                                data={ formObject[step]==undefined? []:formObject[step]['spdeliveriesec'] } 
                                onHandleChange={this.handleChange.bind(this)}
                            />
                    }
                    {
                        noteMSG.length!=0 &&
                            <div className="admin-form-msg">
                                {
                                    noteMSG.map( (msgItem,i) => {
                                        return msgItem;
                                    })
                                }
                            </div>
                    }
                    <div className="admin-form-action">
                        <ul>
                            <li>
                                <button type="button" className="cancel" onClick={this.handleCancel.bind(this)}>取消</button>
                            </li>
                            <li>
                                <button type="submit">{ step!=5? lang['zh-TW']['Submit Next'] : lang['zh-TW']['Finish'] }</button>
                            </li>
                        </ul>
                    </div>
                </form>
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
        window.addEventListener("beforeunload", this.onUnload);
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
        this.props.history.push('/myvendor/products/review');
    }

    handleChange = ( key, val ) => {
        let { formObject } = this.state;
        formObject = { ...formObject, [key]:val }
        this.setState({
            formObject
        })
    }

    onPrevious = (e) => {
        const { step } = this.state;
        this.setState({
            step: step-1,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { id, formObject, step, maxStep, profile } = this.state;
        const { match } = this.props;
        const type = 'product';
        let method = "post";
        
        switch( step ){

            case 1:
                break;

            case 2:
                method = 'put';
                formObject[step] = {
                    id : id,
                    images: formObject[step]
                }
                break;

            case 3:
                method = 'put';
                formObject[step] = {
                    id : id,
                    spec: formObject[step]
                }
                break;

            case 4:
                method = 'put';
                formObject[step] = {
                    id : id,
                    descriptions: formObject[step]
                }
                break;

            case 5:
                method = 'put';
                formObject[step] = {
                    id : id,
                    deliveries: formObject[step]
                }
                break;
        }

        // 檢查必填欄位
        const checkRequired = this.checkRequired(step,formObject);

        if( checkRequired ){
            this.setState({
                loading: true,
            },()=>{
                this.props.dispatch( createProduct( type, formObject[step], step, method ) ).then( res => {
                    this.setState({
                        loading: false
                    },()=>{
                        switch( res['status'] ){
                            case 200:
                                sessionStorage.setItem(`productCreateStep${step}`,JSON.stringify(formObject[step]));
                                if( step==1 ){
                                    this.setState({
                                        step: step==maxStep? maxStep : step+1,
                                        noteMSG: [],
                                        id: res['data']['id']
                                    },()=>{
                                        // 新增成功減掉配額
                                        this.props.dispatch( quota('less',profile) );
                                    })
                                }else{
                                    if( step>=5 ){
                                        this.setState({
                                            open: true,
                                            popupMsg: '新增成功'
                                        })
                                    }else{
                                        this.setState({
                                            step: step==maxStep? maxStep : step+1
                                        })
                                    }
                                }
                                break;
                            
                            default :
                                if( res['status']==502 ){
                                    this.setState({
                                        noteMSG: [<div>{lang['zh-TW']['note']['server busy line']}</div>],
                                    })
                                }
                                break;
                        }
                    })
                });
            });
        }
    }

    checkRequired = ( step,formObject ) => {
        const { required } = this.state;
        const checkRequired = required[step].filter( (filterItem,i) => {

            if( step==1 ){
                if( filterItem=='categories' ){
                    return formObject[step][filterItem].length==0;
                }else{
                    return formObject[step][filterItem]=='';
                }
            }else{
                return formObject[step][filterItem].length==0;
            }
        })

        if( checkRequired.length==0 ){
            return true;
        }else{
            this.setState({
                noteMSG: checkRequired.map( (key,i) => {
                    return (
                        <div key={key}>{ lang['zh-TW']['note'][`${key} required`] }</div>
                    )
                })
            })
            return false;
        }
    }

    onUnload = (e) => {
        const { id } = this.state;
        for( let i=1 ; i<=5 ; i++ ){
            sessionStorage.removeItem(`productCreateStep${i}`);
        }
        console.log( id );
        //this.props.dispatch(  );
        let confirmationMessage = '你正在離開該頁面，我們將會刪除為完成資料！';
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    }
}

const mapStateToProps = state => {
    return{
        profile: state.myvendor.info
    }
}

export default connect(mapStateToProps)(Index);