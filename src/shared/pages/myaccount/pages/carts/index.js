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

// Actions
import { cartsProductList } from '../../../../actions/myaccount';
import { paymentAddOrder } from '../../../../actions/payment';

// Set
import required from './public/set/required';

// Lang
import lang from '../../../../public/lang/lang.json';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            required: required,
            formObject: {
                memberType: "member",
                cartToken: localStorage.getItem('cartID')
            },
            paymentFormObject: {},
            invoiceFormObject: {}
        }
    }

    render(){

        const { history, location, match } = this.props;

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
                {/* <section className="container-unit">
                    代碼
                    <div className="unit-head">
                        <h3>優惠券 / 折扣碼</h3>
                    </div>
                    <Coupon />
                </section> */}
                <section className="container-unit">
                    {/* 付款方式 */}
                    <div className="unit-head">
                        <h3>付款方式</h3>
                    </div>
                    <Payment 
                        returnHandleChange= {(val)=>{
                            this.setState({
                                paymentFormObject: val
                            },()=>{
                                console.log( this.state.paymentFormObject );
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
                    {/* 訂購人 / 收件人資訊 */}
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
    
    handleSubmit = ( e ) => {
        const { location, match, history } = this.props;
        const { pathname, search } = location;
        const { formObject, paymentFormObject, invoiceFormObject, required } = this.state;
        const mergeFormObject = { ...formObject, ...paymentFormObject, ...invoiceFormObject };
        const checkRequiredFilter = Object.keys(mergeFormObject).filter( keys => {
            if( required.includes( keys ) ){
                if( formObject[keys]=="" || formObject[keys]==undefined ){
                    return true;
                }
            }
            return false;
        })

        this.props.dispatch( paymentAddOrder( pathname, queryString.parse(search),mergeFormObject ) ).then( res => {
            switch( res['status'] ){
                case 200:
                    history.push({
                        pathname: '/myaccount/payment',
                        search: queryString.stringify({
                            orderID: res['data']['orderID'],
                            payMethod: res['data']['payMethod']
                        })
                    })
                    break;

                default:
                    const status_text = res['data']['status_text'];
                    toaster.notify(
                        <div className={`toaster-status failure`}>{lang['zh-TW'][status_text]}</div>
                    ,{
                        position: 'bottom-right',
                        duration: 5000
                    })
                    break;
            }
        });

        if( checkRequiredFilter.length==0 ){
            // 填寫完整
            console.log( mergeFormObject );
        
        }else{
            // 沒填寫完整
            console.log( checkRequiredFilter );
        }        
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )( Index );