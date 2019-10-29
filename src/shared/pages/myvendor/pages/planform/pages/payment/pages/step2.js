import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';

// Compoents
import PurchaseInfo  from '../components/form/purchase_info';
import PayMethod     from '../components/form/payMethod';
import Coupon        from '../components/form/coupon';
import Invoice       from '../components/form/invoice/index';

// Modules
import Confirm from '../../../../../../../module/confirm';

// Actions
import { paymentAddOrder } from '../../../../../../../actions/payment';

// Javascripts
import { checkRequired } from '../../../../../../../public/javascripts/checkFormat';

// Lang
import lang from '../../../../../../../public/lang/lang.json';

// Set
import required from '../public/set/required';

class Step2 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open                  : false,
            method                : "confirm",
            popupMsg              : [],
            required              : required,
            profile               : props.profile,
            vendorBuyPlanform     : JSON.parse(sessionStorage.getItem('vendorBuyPlanform')),
            mergeFormObject       : {},
            formObject            : {
                memberType          : "vendor"
            },
            paymentFormObject     : {},
            invoiceFormObject     : {},
            couponFormObject      : {},
            returnBody            : ""
        }
    }

    static getDerivedStateFromProps( props,state ) {
        return{
            profile: props.profile,
        }
    }

    render(){

        const { location } = this.props;
        const { open, method, popupMsg, profile, returnBody, vendorBuyPlanform, couponFormObject } = this.state;
        const discountAmount       = couponFormObject['discountAmount'] || 0;
        const beforeDiscountAmount = vendorBuyPlanform['price'] * vendorBuyPlanform['programNum'];
        const afterDiscountAmount  = beforeDiscountAmount - discountAmount;

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
                                            <label>原價</label>
                                            <div><CurrencyFormat value={beforeDiscountAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                        </li>
                                        <li>
                                            <label>應付金額</label>
                                            <div><CurrencyFormat value={afterDiscountAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
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
                            <Coupon 
                                location = {location}
                                returnHandleChange = { val => {
                                    const { couponFormObject } = this.state;
                                    const { couponCode, discountUnit, discountAmount } = val;
                                    this.setState({
                                        couponFormObject: {
                                            ...couponFormObject,
                                            couponCode      : couponCode,
                                            discountUnit    : discountUnit,
                                            discountAmount  : discountAmount
                                        }
                                    })
                                    console.log(val);
                                }}
                            />
                        </div>
                    </section>

                    <section className="admin-content-row">
                        <article className="admin-content-title">
                            <h4>發票</h4>
                        </article>
                        <div className="admin-content-container">
                            <Invoice 
                                profile= {profile}
                                returnHandleChange= {(val)=>{
                                    this.setState({
                                        invoiceFormObject: val
                                    })
                                }}
                            />
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

        const { location, history } = this.props;
        const { search } = location;
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

        const { required, formObject, paymentFormObject, invoiceFormObject, couponFormObject } = this.state;
        let   mergeFormObject = {};
        if( couponFormObject['couponCode']==undefined || couponFormObject['couponCode']=="" ){
            mergeFormObject = { ...formObject, ...paymentFormObject, ...invoiceFormObject };
        }else{
            mergeFormObject = { ...formObject, ...paymentFormObject, ...invoiceFormObject, couponCode: couponFormObject['couponCode'] };
        }
        //const mergeFormObject = { ...formObject, ...paymentFormObject, ...invoiceFormObject, couponCode: couponFormObject['couponCode'] };
        const filterRequired = Object.keys(mergeFormObject).filter( keys => required.includes( keys ) );
        const checkRequiredFilter = checkRequired( filterRequired, mergeFormObject );
        if( checkRequiredFilter.length==0 ){
            // 填寫完整
            this.setState({
                open            : true,
                popupMsg        : [<div key="checkBuyPlanform">確定是否購買此方案？</div>],
                mergeFormObject : mergeFormObject
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

        const { location, history, match } = this.props;
        const { pathname, search } = location;
        const mergeFormObject      = {
            ...this.state.mergeFormObject,
            tripleCompanyName : this.state.mergeFormObject['invoiceCompanyName'],
            orderCellPhone    : this.state.mergeFormObject['orderPhone'],
            programToken      : queryString.parse(search)['programToken'] || "", // 要上架的商品 id 列表
            programNum        : queryString.parse(search)['programNum'] || "", // 購買組數
        };
        
        this.props.dispatch( paymentAddOrder(pathname, {...queryString.parse(search)}, mergeFormObject) ).then( res => {
            this.setState({
                open     : false,
                popupMsg : []
            },()=>{
                switch( res['status'] ){
                    case 200:
                        const orderID     = res['data']['orderID'];
                        const payMethod   = res['data']['payMethod'];
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

                            case 'COUPON':
                                history.push({
                                    pathname: `/myvendor/planform/payment/step3`,
                                    search: `orderID=${orderID}`
                                });
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