import React from 'react';
import axios from 'axios';
import toaster from 'toasted-notes';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Components
import ProductWrap from './product';
import Coupon from './coupon'; // 這階段未開製作
import Payment from './payment';
import Transports from './transport';
import Invoice from './invoice';
import Action from './action';

// Modules
import Confirm from '../../../../module/confirm';
import Loading from '../../../../module/loading/mallLoading';

// Actions
import { cartsProductList, cartsCount } from '../../../../actions/myaccount';
import { paymentAddOrder } from '../../../../actions/payment';
import { getCartID } from '../../../../actions/common';

// Stylesheets
import './public/stylesheets/style.scss';

// Javascripts
import { checkRequired, isCertificated, isInvoice } from '../../../../public/javascripts/checkFormat';

// Set
import required from './public/set/required';

// Lang
import lang from '../../../../public/lang/lang.json';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            loading: false,
            method: "confirm",
            popupMsg: "",
            required: required,        
            formObject: {
                memberType: "member",
                cartToken: localStorage.getItem('cartID')
            },
            paymentFormObject: {},
            invoiceFormObject: {},
            newebpayFormObject: {
                url: "",
                val: ""
            },
            returnBody: ""
        }
    }

    render(){

        const { history, location, match } = this.props;
        const { loading, header, open, method, popupMsg, returnBody } = this.state;

        return(
            <React.Fragment>
                <section className="container-unit">
                    {/* 購買清單 */}
                    <div className="unit-head">
                        <h3>購買清單</h3>
                    </div>
                    <ProductWrap 
                        match= {match}
                        history= {history}
                        location= {location}
                    />
                </section>
                <section className="container-unit">
                    代碼
                    <div className="unit-head">
                        <h3>優惠券 / 折扣碼</h3>
                    </div>
                    <Coupon />
                </section> 
                <section className="container-unit">
                    {/* 付款方式 */}
                    <div className="unit-head">
                        <h3>付款方式</h3>
                    </div>
                    <Payment 
                        match = {match}
                        location = {location}
                        returnHandleChange= {(val)=>{
                            this.setState({
                                paymentFormObject: val
                            });
                        }}
                    />
                </section>
                <section className="container-unit">
                    {/* 訂購人 / 收件人資訊 */}
                    <div className="unit-head">
                        <h3>訂購人 / 收件人資訊</h3>
                    </div>
                    <Transports 
                        returnHandleChange= {(val)=>{
                            this.setState({
                                formObject: { ...this.state.formObject, ...val }
                            });
                        }}
                    />
                </section>
                <section className="container-unit">
                    {/* 發票 */}
                    <div className="unit-head">
                        <h3>發票</h3>
                    </div>
                    <Invoice 
                        returnHandleChange= {(val)=>{
                            this.setState({
                                invoiceFormObject: val
                            })
                        }}
                    />
                </section>
                <section className="container-unit">
                    <Action 
                        returnAction= {this.handleSubmit.bind(this)}
                    />
                </section>
                {
                    returnBody!="" &&
                        <React.Fragment >
                            <div id="newebpay-loading-wrap" dangerouslySetInnerHTML={{__html: returnBody}} ref={el => (this.instance = el)}></div>
                        </React.Fragment>
                }
                <Confirm
                    header={header}
                    open={open}
                    method={method}
                    container={popupMsg}
                    onCancel={this.onCancel.bind(this)}
                />
                <Loading loading={loading} />
            </React.Fragment>
        );
    }

    componentDidMount() {
        // 取得購物車商品
        this.props.dispatch( cartsProductList() );
        // 取得使用者 IP
        axios({
            method: 'post',
            url:'https://geoip-db.com/json/',
        }).then( res => {
            this.setState({
                formObject: { ...this.state.formObject, memberIPAddress: res['data']['IPv4'] }
            })
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { returnBody } = this.state;
        if( returnBody!="" ){
            const s = document.createElement('script');
            s.async = true;
            s.innerHTML = "setTimeout(function(){ document.forms.pay2go.submit(); }, 1000)";
            this.instance.appendChild(s);
        }
    }
        
    handleSubmit = ( e ) => {
        
        const { location, match, history } = this.props;
        const { pathname, search } = location;
        const { formObject, paymentFormObject, invoiceFormObject, required } = this.state;
        const mergeFormObject = { ...formObject, ...paymentFormObject, ...invoiceFormObject };
        const filterRequired = Object.keys(mergeFormObject).filter( keys => required.includes( keys ) );
        const checkRequiredFilter = checkRequired(filterRequired, mergeFormObject);

        if( checkRequiredFilter.length==0 ){
            let checkInvoiceFormat = false;
            const invoiceCarruerNum = mergeFormObject['invoiceCarruerNum'];
            switch( mergeFormObject['invoiceCarruerType'] ){
                case "1":
                    // 自然人憑證載具
                    checkInvoiceFormat = isCertificated(invoiceCarruerNum);
                    break;

                case "2":
                    // 電商載具
                    checkInvoiceFormat = isInvoice(invoiceCarruerNum);
                    break;

                default:
                    // 手機條碼載具
                    checkInvoiceFormat = true;
                    break;
            }
            
            // 檢查發票格式
            if( checkInvoiceFormat ) {
                // 填寫完整  
                this.setState({
                    loading: true
                },()=>{
                    this.props.dispatch( paymentAddOrder( pathname, queryString.parse(search),mergeFormObject ) ).then( res => {
                        this.setState({
                            loading: false
                        },()=>{
                            switch( res['status'] ){
                                case 200:
                                    // 刪除現有的購物車 cartID
                                    localStorage.removeItem('cartID');
                                    const orderID = res['data']['orderID'];
                                    const payMethod = res['data']['payMethod'];
                                    const returnBody = payMethod=='cc'? res['data']['body'] : "";
                                    // 要回新一組 cartID
                                    this.props.dispatch( getCartID() ).then( cartRes => {
                                        this.props.dispatch( cartsCount() );
                                        switch( payMethod ){
                                            case 'atm':
                                                // 成功後導頁
                                                history.push({
                                                    pathname: '/myaccount/payment/success',
                                                    search: queryString.stringify({
                                                        orderID,
                                                        payMethod
                                                    })
                                                })
                                                break;

                                            case 'cc':
                                                // 刪除現有的購物車 cartID
                                                this.setState({
                                                    returnBody
                                                })
                                                break;

                                            default:

                                                break;
                                        }
                                    });

                                    break;

                                default:
                                    // 失敗就於右下角跳出錯誤訊息
                                    const status_text = res['data']['status_text'];
                                    toaster.notify(
                                        <div className={`toaster-status failure`}>{lang['zh-TW'][status_text]}</div>
                                    ,{
                                        position: 'bottom-right', // 訊息窗顯示於右下角
                                        duration: 5000 // 訊息5秒後消失
                                    })
                                    break;
                            }
                        })
                    });
                })  
            }else{
                this.setState({
                    open: true,
                    method: 'alert',
                    popupMsg: `<div className="items">${lang['zh-TW']['note']['invoice wrong format']}</div>`
                })
            }
        }else{
            // 沒填寫完整
            this.setState({
                open: true,
                method: 'alert',
                popupMsg: checkRequiredFilter
            })
        }        
    }

    onCancel = () => {
        this.setState({
            open: false,
            method: 'confirm',
            popupMsg: ""
        })
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )( Index );