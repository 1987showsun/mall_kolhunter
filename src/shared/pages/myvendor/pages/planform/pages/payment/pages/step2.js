import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Compoents
import PurchaseInfo from '../form/purchase_info';
import PayMethod from '../form/payMethod';
import Invoice from '../form/invoice';

// Actions
import { paymentAddOrder } from '../../../../../../../actions/payment';

// Lang
import lang from '../../../../../../../public/lang/lang.json';

class Step2 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            msg: [],
            required: ['company','contactor','email','phone','zipcode','city','district','address','cvc','exp','cardno'],
            profile: props.profile,
            formObject: {
                memberType: "vendor"
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

    static getDerivedStateFromProps( props,state ) {
        return{
            profile: props.profile,
        }
    }

    render(){

        const { msg, profile, returnBody } = this.state;

        return(
            <React.Fragment>
                <form onSubmit={this.hanleSubmit.bind(this)}>
                    <section className="admin-content-row">
                        <article className="admin-content-title">
                            <h4>購買資料</h4>
                        </article>
                        <div className="admin-content-container">
                            <PurchaseInfo 
                                returnHandleChange= {(val)=>{
                                    const { formObject } = this.state;
                                    this.setState({
                                        formObject: {
                                            ...formObject,
                                            ...val
                                        }                                        
                                    })
                                }}
                            />
                        </div>

                        <article className="admin-content-title">
                            <h4>付款方式</h4>
                        </article>
                        <div className="admin-content-container">
                            <PayMethod 
                                returnHandleChange= {(val)=>{
                                    this.setState({
                                        paymentFormObject: val
                                    });
                                }} 
                            />
                        </div>

                        <article className="admin-content-title">
                            <h4>發票</h4>
                        </article>
                        <div className="admin-content-container">
                            {
                                profile['invoice']!="" || profile['invoice']!=undefined? (
                                    <div>三聯式發票</div>
                                ):(
                                    <div>二聯式發票</div>
                                )
                            }
                        </div>
                        {
                            msg.length!=0 &&
                                <div className="admin-content-container">{msg}</div>
                        }
                        <div className="admin-content-action">
                            <ul>
                                <li>
                                    <button type="button" className="cancel" onClick={this.actionBtn.bind(this,'cancel')}>取消</button>
                                </li>
                                <li>
                                    <button type="submit" className="basic">確定，下一步</button>
                                </li>
                            </ul>
                        </div>
                    </section>
                </form>
                {
                    returnBody!="" &&
                        <React.Fragment >
                            <div id="newebpay-loading-wrap" dangerouslySetInnerHTML={{__html: returnBody}} ref={el => (this.instance = el)}></div>
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, history, match } = this.props;
        const { pathname, search } = location;
        const query = queryString.parse(search);
        if( query['programNum']==undefined || query['programToken']==undefined ){
            history.push({
                pathname: '/myvendor/planform/list'
            })
        }else{
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
    }

    componentDidUpdate(prevProps, prevState) {
        const { returnBody } = this.state;
        const prevReturnBody = prevState.returnBody;
        if( returnBody!="" ){
            const s = document.createElement('script');
            s.async = true;
            s.innerHTML = "setTimeout(function(){ document.forms.pay2go.submit(); }, 1000)";
            this.instance.appendChild(s);
        }
    }

    hanleSubmit = (e) => {
        e.preventDefault();
        const { location, history, match } = this.props;
        const { pathname, search } = location;
        const { required, formObject, paymentFormObject } = this.state;
        const query = {...queryString.parse(search)};
        const mergeData = { ...formObject, ...paymentFormObject };
        const checkRequired = required.filter( keys => mergeData[keys]=="").map( keys => <div key={keys} className="items">{lang['zh-TW']['note'][`${keys} required`]}</div>);
        let checkoutFormObject = {};
        if( checkRequired.length==0 ){
            checkoutFormObject = {
                memberType              : "vendor",
                memberIPAddress         : formObject['memberIPAddress'], // 會員 IP
                orderCompanyName        : formObject['company'], //公司名稱
                orderName               : formObject['contactor'], // 訂購人姓名/承辦人
                orderEmail              : formObject['email'], // 連絡信箱
                orderPhone              : formObject['phone'], // 聯絡電話
                orderCellPhone          : formObject['phone'], // 聯絡電話
                orderZipCode            : formObject['zipcode'], // 訂購者/購買者的郵遞區號
                orderCity               : formObject['city'], // 訂購者城市
                orderDist               : formObject['district'], // 訂購者鄉縣市鎮區
                orderAddress            : formObject['address'], // 訂購者地址明細
                programToken            : queryString.parse(search)['programToken'] || "", // 要上架的商品 id 列表
                programNum              : queryString.parse(search)['programNum'] || "", // 購買組數
                invoiceType             : formObject['invoice']==""? 2:3, // 2,3,donate
                invoiceCompanyUniNumber : formObject['invoice'], // 三聯式發票統編
                invoiceDonation         : "", // 捐贈發票對象....
                tripleCompanyName       : formObject['company'], // 三聯式發票抬頭
                ...paymentFormObject
            }
            this.props.dispatch( paymentAddOrder("", {}, checkoutFormObject) ).then( res => {
                switch( res['status'] ){
                    case 200:
                        const orderID = res['data']['orderID'];
                        const payMethod = res['data']['payMethod'];
                        const returnBody = payMethod=='cc'? res['data']['body'] : "";
                        switch( payMethod ){
                            case 'atm':
                                history.push({
                                    pathname: `/myvendor/planform/payment/step3`,
                                    search: `orderID=${orderID}`
                                });
                                break;

                            case 'cc':
                                this.setState({
                                    returnBody
                                })
                                break;

                            default:
                                break;
                        }
                        break;

                    default:
                        break;
                }
            });
        }else{
            this.setState({
                msg: checkRequired
            })
        }
        // const { location, history, match } = this.props;
        // const { pathname, search } = location;
        // const { msg, required, formObject } = this.state;
        // const query = {...queryString.parse(search)};
        // const checkoutFormObject = {
        //     memberType              : "vendor",
        //     memberIPAddress         : formObject['memberIPAddress'], // 會員 IP
        //     orderCompanyName        : formObject['company'], //公司名稱
        //     orderName               : formObject['contactor'], // 訂購人姓名/承辦人
        //     orderEmail              : formObject['email'], // 連絡信箱
        //     orderPhone              : formObject['phone'], // 聯絡電話
        //     orderCellPhone          : formObject['phone'], // 聯絡電話
        //     orderZipCode            : formObject['zipcode'], // 訂購者/購買者的郵遞區號
        //     orderCity               : formObject['city'], // 訂購者城市
        //     orderDist               : formObject['district'], // 訂購者鄉縣市鎮區
        //     orderAddress            : formObject['address'], // 訂購者地址明細
        //     programToken            : queryString.parse(search)['programToken'] || "", // 要上架的商品 id 列表
        //     programNum              : queryString.parse(search)['programNum'] || "", // 購買組數
        //     payMethod               : formObject['payMethod'], // cc, atm, cvs
        //     invoiceType             : formObject['invoice']==""? 2:3, // 2,3,donate
        //     invoiceDonation         : "", // 捐贈發票對象....
        //     invoiceCompanyUniNumber : formObject['invoice'], // 三聯式發票統編
        //     tripleCompanyName       : formObject['company'], // 三聯式發票抬頭
        //     returnURL               : "" // 完成購物付款後想要轉導向的頁面網址
        // }

        // const checkRequired = required.filter( keys => checkoutFormObject['keys']=="").map( keys => <div className="items">{lang['zh-TW']['note'][`${keys} required`]}</div>);

        // if( checkRequired.length==0 ){
        //     this.props.dispatch( paymentAddOrder("", {}, checkoutFormObject) ).then( res => {
        //         switch( res['status'] ){
        //             case 200:
        //                 history.push({
        //                     pathname: `/myvendor/planform/payment/step3`,
        //                     search: `orderID=${res['data']['orderID']}`
        //                 });
        //                 break;

        //             default:
        //                 break;
        //         }
        //     });
        // }else{
        //     this.setState({
        //         msg: checkRequired
        //     })
        // }
    }

    actionBtn = ( val ) => {

        const { location, history, match } = this.props;
        const { pathname, search } = location;
        const query = {...queryString.parse(search)};

        switch( val ){
            default:
                history.push({
                    pathname: '/myvendor/planform/list'
                });
                break;
        }
    }
}

const mapStateToProps = state => {
    return{
        profile: state.myvendor.info
    }
}

export default connect( mapStateToProps )( Step2 );