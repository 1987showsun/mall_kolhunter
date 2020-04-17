/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                  from 'react';
import axios                  from 'axios';
import toaster                from 'toasted-notes';
import queryString            from 'query-string';
import { connect }            from 'react-redux';

// Components
import ProductWrap            from './components/product';
import Coupon                 from './components/coupon'; // 這階段未開製作
import Payment                from './components/payment';
import Transports             from './components/transport';
import Invoice                from './components/invoice';
import Action                 from './components/action';

// Modules
import Confirm                from '../../../../module/confirm';
import Loading                from '../../../../module/loading/mallLoading';

// Actions
import { cartsProductList, cartsCount } from '../../../../actions/myaccount';
import { paymentAddOrder }              from '../../../../actions/payment';
import { getCartID }                    from '../../../../actions/common';

// Stylesheets
import './public/stylesheets/style.scss';

// Javascripts
import { checkRequired, isCertificated, isInvoice, isPhoneNumber } from '../../../../public/javascripts/checkFormat';

// Set
import required                                     from './public/set/required';

// Lang
import lang                                         from '../../../../public/lang/lang.json';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open                : false,
            loading             : false,
            method              : "confirm",
            popupMsg            : "",
            required            : required, 
            spgatewayFormName   : '',
            formObject          : {
                memberType        : "member",
                cartToken         : localStorage.getItem('cartID')
            },
            paymentFormObject   : {},
            invoiceFormObject   : {},
            newebpayFormObject  : {
                url               : "",
                val               : ""
            },
            returnBody          : "",
            cartProductList     : props.cartProductList,
        }
    }

    static getDerivedStateFromPRops( props,state ){
        return{
            cartProductList     : props.cartProductList 
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
                        match               = {match}
                        history             = {history}
                        location            = {location}
                    />
                </section>
                {/* <section className="container-unit">
                    代碼
                    <div className="unit-head">
                        <h3>優惠券 / 折扣碼</h3>
                    </div>
                    <Coupon />
                </section>  */}
                <section className="container-unit">
                    {/* 付款方式 */}
                    <div className="unit-head">
                        <h3>付款方式</h3>
                    </div>
                    <Payment
                        match               = {match}
                        location            = {location}
                        returnHandleChange  = {val => {
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
                    header     = {header}
                    open       = {open}
                    method     = {method}
                    container  = {popupMsg}
                    onConfirm  = {this.onConfirm.bind(this)}
                    onCancel   = {this.onCancel.bind(this)}
                    onRedirectHome   = {this.onRedirectHome.bind(this)}
                />
                <Loading loading={loading} />
            </React.Fragment>
        );
    }

    componentDidMount() {
        window.scrollTo(0, 0);
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
        const { spgatewayFormName, returnBody } = this.state;
        if( returnBody!="" ){
            const s     = document.createElement('script');
            s.async     = true;
            s.innerHTML = `setTimeout(function(){ document.forms.${spgatewayFormName}.submit(); }, 1000)`;
            this.instance.appendChild(s);
        }
    }
        
    handleSubmit = ( e ) => {
        
        const { formObject, paymentFormObject, invoiceFormObject, required } = this.state;
        const mergeFormObject     = { ...formObject, ...paymentFormObject, ...invoiceFormObject };
        const filterRequired      = Object.keys(mergeFormObject).filter( keys => required.includes( keys ) );
        const checkRequiredFilter = checkRequired(filterRequired, mergeFormObject);

        if ( isPhoneNumber(mergeFormObject['orderPhone']) != true ){
            this.setState({
                open       : true,
                method     : 'alert',
                popupMsg   : `<div className="items">訂購人的聯絡電話格式不正確</div>`
            })
            return;
        }
        if ( isPhoneNumber(mergeFormObject['deliveryPhone']) != true ){
            this.setState({
                open       : true,
                method     : 'alert',
                popupMsg   : `<div className="items">收件人的聯絡電話格式不正確</div>`
            })
            return;
        }
        
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
                    open       : true,
                    method     : 'confirm',
                    popupMsg   : `<div className="items">所購買之商品可能為不同廠商出貨，配送時間將依廠商寄送為主。</div>`
                });
            }else{
                this.setState({
                    open       : true,
                    method     : 'alert',
                    popupMsg   : `<div className="items">${lang['zh-TW']['note']['invoice wrong format']}</div>`
                })
            }
        }else{
            // 沒填寫完整
            this.setState({
                open      : true,
                method    : 'alert',
                popupMsg  : checkRequiredFilter
            })
        }        
    }

    onCancel = () => {
        this.setState({
            open           : false,
            method         : 'confirm',
            popupMsg       : ""
        })
    }

    onConfirm = () => {

        const { location, history } = this.props;
        const { pathname, search }  = location;
        const { formObject, paymentFormObject, invoiceFormObject, cartProductList } = this.state;
        const mergeFormObject       = { ...formObject, ...paymentFormObject, ...invoiceFormObject };

        this.setState({
            loading    : true,
            open       : false,
            popupMsg   : []
        },()=>{
            this.props.dispatch( paymentAddOrder( pathname, queryString.parse(search),mergeFormObject ) ).then( res => {
                this.setState({
                    loading: false
                },()=>{
                    switch( res['status'] ){
                        case 200:
                            const payMethod   = res['data']['payMethod'];
                            const returnBody  = payMethod=='cc'? res['data']['body'] : "";
                            if( returnBody!='pay checkcode error' || returnBody=="" ){
                                // 刪除現有的購物車 cartID
                                localStorage.removeItem('cartID');
                                const orderID    = res['data']['orderID'];
                                // 要回新一組 cartID
                                this.props.dispatch( getCartID() ).then( cartRes => {
                                    this.props.dispatch( cartsCount() );
                                    switch( payMethod ){
                                        case 'atm':
                                            // 成功後導頁
                                            history.push({
                                                pathname  : '/myaccount/payment/success',
                                                search    : queryString.stringify({
                                                    orderID,
                                                    payMethod
                                                })
                                            });
                                            break;

                                        case 'cc':
                                            if (typeof returnBody=='object') {
                                                this.setState({
                                                    open         : true,
                                                    method       : 'alert',
                                                    popupMsg     : `<div className="items"><h3>付款失敗</h3><p>${returnBody['message']} (${returnBody['code']})</p></div>`
                                                })
                                            } else {
                                                // 刪除現有的購物車 cartID
                                                const isCheckString = returnBody.indexOf('<html>')>=0? true : false;
                                                if( isCheckString ){
                                                    const searchStaetIndex = returnBody.search('<form');
                                                    const searchEndIndex   = returnBody.search('</form>')+7;
                                                    const filterTEXT       = returnBody.substring( searchStaetIndex, searchEndIndex+7 );
                                                    const mergeTEXT        = `<div style='padding:10%;text-align: center;'><div><img style='min-width: 55%;max-width: 50%;' src='https://ccore.newebpay.com/images/logo/logo_footer.png'/></div><div style='font-family:Microsoft JhengHei;font-size:2em'>頁面轉跳中，請稍候<span id='dote'>...</span></div></div>${filterTEXT}<script language=javascript>setTimeout(function(){ document.forms.HPP.submit(); }, 1000);</script>`
                                                    this.setState({
                                                        returnBody: mergeTEXT,
                                                        spgatewayFormName: 'HPP'
                                                    })
                                                }else{
                                                    this.setState({
                                                        returnBody,
                                                        spgatewayFormName: 'pay2go'
                                                    })
                                                }
                                            }
                                            break;

                                        default:
                                            history.push({
                                                pathname  : '/myaccount/payment/success',
                                                search    : queryString.stringify({
                                                    orderID,
                                                    payMethod
                                                })
                                            });
                                            break;
                                    }
                                });
                            }else{
                                this.setState({
                                    open         : true,
                                    method       : 'alert',
                                    popupMsg     : `<div className="items">${lang['zh-TW']['note']['pay checkcode error']}</div>`
                                })
                            }

                            break;

                        default:
                            // 失敗就於右下角跳出錯誤訊息
                            const status_text      = res['data']['status_text'];
                            if (status_text=='spec sold out') {
                                this.setState({
                                    loading    : true,
                                    open       : false,
                                    popupMsg   : []
                                })
                                // 產品規格庫存量已售完
                                this.setState({
                                    open         : true,
                                    method       : 'redirectHome',
                                    popupMsg     : `<div className="items">${lang['zh-TW']['note']['spec sold out']}</div>`
                                })
                                this.props.dispatch( cartsCount() );
                                
                            } else if (status_text=='empty shop cart list') {
                                history.push({
                                    pathname  : '/',
                                });
                            } else {
                                const msg = status_text.map((item,i) => {
                                    if( item.hasOwnProperty('parentProductToken') ){
                                        // 組合商品
                                        const filterItemArray = cartProductList.filter( filterItem => item['parentProductToken']==filterItem['productToken'] );
                                        return filterItemArray.map( filterItem => {
                                            const  findItemArray =  filterItem['spec'].find((findItem, fi) => findItem['specToken'] == item['specToken'] );
                                            return [<div key={fi} className={`toaster-status failure`}>{`${findItemArray[0]['productName']}-${findItemArray[0]['specName']} ${lang['zh-TW'][item['msg']]}`}</div>];
                                        })
                                    }else{
                                        // 非組合商品
                                        const filterItemArray = cartProductList.filter( filterItem => item['parentProductToken']==filterItem['productToken'] );
                                        return filterItemArray.map( filterItem => {
                                            const  findItemArray =  filterItem['spec'].find((findItem, fi) => findItem['specToken'] == item['specToken'] );
                                            return [<div key={fi} className={`toaster-status failure`}>{`${findItemArray[0]['productName']}-${findItemArray[0]['specName']} ${lang['zh-TW'][item['msg']]}`}</div>];
                                        });
                                    }
                                })
                                
                                toaster.notify(
                                    msg
                                ,{
                                    position : 'bottom-right', // 訊息窗顯示於右下角
                                    duration : 3000            // 訊息5秒後消失
                                })

                                // toaster.notify(
                                //     <div className={`toaster-status failure`}>{lang['zh-TW'][status_text]}</div>
                                // ,{
                                //     position : 'bottom-right', // 訊息窗顯示於右下角
                                //     duration : 3000            // 訊息5秒後消失
                                // })
                            }
                    }
                })
            });
        });
    }

    onRedirectHome = () => {
        const { history } = this.props;
        history.push({
            pathname  : '/',
        });
    }
}

const mapStateToProps = state => {
    return{
        cartProductList  : state.myaccount.cartItems
    }
}

export default connect( mapStateToProps )( Index );