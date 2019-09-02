import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// Components
import ProductWrap from './product';
import Coupon from './coupon';
import Payment from './payment';
import Transports from './transport';
import Invoice from './invoice';
import Action from './action';

// Actions
import { cartsProductList } from '../../../../actions/myaccount';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            required: ['orderName','orderEmail','orderPhone','orderCity','orderDist','orderAddress','deliveryName','deliveryPhone','deliveryCellPhone','deliveryEmail','deliveryCity','deliveryDist','deliveryAddress','orderDist','orderAddress','payMethod','cardno','cvc','exp','invoiceType'],
            formObject: {
                cartToken: localStorage.getItem('cartID')
            }
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
                        returnHandleChange= {this.returnHandleChange.bind(this)}
                    />
                </section>
                <section className="container-unit">
                    {/* 訂購人 / 收件人資訊 */}
                    <div className="unit-head">
                        <h3>訂購人 / 收件人資訊</h3>
                    </div>
                    <Transports 
                        returnHandleChange= {this.returnHandleChange.bind(this)}
                    />
                </section>
                <section className="container-unit">
                    {/* 訂購人 / 收件人資訊 */}
                    <div className="unit-head">
                        <h3>發票</h3>
                    </div>
                    <Invoice 
                        returnHandleChange= {this.returnHandleChange.bind(this)}
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
        })
    }
    
    returnHandleChange = ( val ) => {
        this.setState({
            formObject: { ...this.state.formObject, ...val }
        });
    }

    handleSubmit = ( e ) => {
        const { formObject, required } = this.state;
        const checkRequiredFilter = Object.keys(formObject).filter( keys => {
            if( required.includes( keys ) ){
                if( formObject[keys]=="" ){
                    return true;
                }
            }
            return false;
        })
        console.log( formObject,checkRequiredFilter );
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )( Index );