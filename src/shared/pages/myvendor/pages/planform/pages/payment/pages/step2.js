import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';

// Compoents
import PurchaseInfo from '../form/purchase_info';
import PayMethod from '../form/payMethod';
import Coupon from '../form/coupon';
import Invoice from '../form/invoice';

// Modules
import Confirm from '../../../../../../../module/confirm';

// Actions
import { paymentAddOrder } from '../../../../../../../actions/payment';

// Javascripts
import { checkRequired } from '../../../../../../../public/javascripts/checkFormat';

// Lang
import lang from '../../../../../../../public/lang/lang.json';

class Step2 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            method: "confirm",
            popupMsg: [],
            required: ['company','contactor','email','phone','zipcode','city','district','address'],
            ccRequired: ['cvc','exp','cardno'],
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

        const vendorBuyPlanform= JSON.parse(sessionStorage.getItem('vendorBuyPlanform'));
        const { open, method, popupMsg, profile, returnBody } = this.state;

        return(
            <React.Fragment>
                <form onSubmit={this.hanleSubmit.bind(this)}>
                    {
                        vendorBuyPlanform!=undefined && 
                            <section className="admin-content-row">
                                <article className="admin-content-title">
                                    <h4>所選方案</h4>
                                </article>
                                <div className="admin-content-container">
                                    <ul className="table-row-list">
                                        <li>
                                            <label>購買方案</label>
                                            <div>{vendorBuyPlanform['title']}</div>
                                        </li>
                                        <li>
                                            <label>購買數量</label>
                                            <div>{vendorBuyPlanform['programNum']}</div>
                                        </li>
                                        <li>
                                            <label>應付金額</label>
                                            <div><CurrencyFormat value={vendorBuyPlanform['price']*vendorBuyPlanform['programNum']} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                            
                                        </li>
                                    </ul>
                                </div>
                            </section>
                    }

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
                    </section>

                    <section className="admin-content-row">
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
                    </section>

                    <section className="admin-content-row">
                        <article className="admin-content-title">
                            <h4>代碼</h4>
                        </article>
                        <div className="admin-content-container">
                            <Coupon />
                        </div>
                    </section>

                    <section className="admin-content-row">
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
                    </section>

                    <section className="admin-content-row">
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

                <Confirm
                    open= {open}
                    method= {method}
                    container= {popupMsg}
                    onConfirm= {this.okToBuyThisProgram.bind(this)}
                    onCancel= {()=>{
                        this.setState({
                            open: false,
                            method: 'confirm',
                            popupMsg: []
                        })
                    }}
                />
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
        const storageProgramToken = sessionStorage.getItem('vendorBuyPlanform')!=undefined? JSON.parse(sessionStorage.getItem('vendorBuyPlanform'))['token'] : "";
        const { programNum, programToken } = queryString.parse(search);
        const gotoBack = () => {
            history.push({
                pathname: '/myvendor/planform/list'
            })
        }

        if( programNum==undefined || programToken==undefined ){
            gotoBack();
        }else{
            if( programToken!=storageProgramToken ){
                gotoBack();
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

    hanleSubmit = (e) => {
        e.preventDefault();
        const { required, ccRequired, formObject, paymentFormObject } = this.state;
        const { payMethod } = paymentFormObject;
        let mergeRequired = [];
        switch( payMethod ){
            case 'cc':
                mergeRequired = [ ...required, ...ccRequired ];
                break;

            default: 
                mergeRequired = [ ...required ];
                break;
        }
        const checkRequiredFilter = checkRequired( mergeRequired, { ...formObject, ...paymentFormObject } );
        if( checkRequiredFilter.length==0 ){
            // 填寫完整
            this.setState({
                open: true,
                popupMsg: [<div key="checkBuyPlanform">確定是否購買此方案？</div>]
            })
        }else{
            // 未填寫完整
            this.setState({
                open: true,
                method: 'alert',
                popupMsg: checkRequiredFilter
            })
        }
    }

    okToBuyThisProgram = () => {
        const { formObject, paymentFormObject } = this.state;
        const { location, history, match } = this.props;
        const { pathname, search } = location;
        const checkoutFormObject = {
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
        };

        this.props.dispatch( paymentAddOrder(pathname, {...queryString.parse(search)}, checkoutFormObject) ).then( res => {
            this.setState({
                open: false,
                popupMsg: []
            },()=>{
                switch( res['status'] ){
                    case 200:
                        const orderID = res['data']['orderID'];
                        const payMethod = res['data']['payMethod'];
                        switch( payMethod ){
                            case 'atm':
                                // ATM 付款
                                history.push({
                                    pathname: `/myvendor/planform/payment/step3`,
                                    search: `orderID=${orderID}`
                                });
                                break;

                            case 'cc':
                                // 信用卡付款
                                const returnBody = payMethod=='cc'? res['data']['body'] : "";
                                this.setState({
                                    returnBody
                                })
                                break;

                            default:
                                // 超商付款
                                break;
                        }
                        break;

                    default:
                        break;
                }
            });
        });
        
    }

    actionBtn = ( val ) => {

        const { location, history, match } = this.props;
        const { pathname, search } = location;
        const query = {...queryString.parse(search)};

        switch( val ){
            default:
                sessionStorage.removeItem('vendorBuyPlanform');
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