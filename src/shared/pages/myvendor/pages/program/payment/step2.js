import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// Compoents
import PurchaseInfo from './form/purchase_info';
import PayMethod from './form/payMethod';
import Invoice from './form/invoice';

// Actions
import { paymentAddOrder } from '../../../../../actions/payment';

class Step2 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            profile: props.profile,
            formObject: props.profile
        }
    }
    
    static getDerivedStateFromProps( props,state ) {
        return{
            profile: props.profile,
        }
    }

    render(){

        const { profile } = this.state;

        return(
            <form onSubmit={this.hanleSubmit.bind(this)}>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>購買資料</h4>
                    </article>
                    <div className="admin-content-container">
                        <PurchaseInfo 
                            returnHandleChange= {this.returnHandleChange.bind(this)}
                        />
                    </div>

                    <article className="admin-content-title">
                        <h4>付款方式</h4>
                    </article>
                    <div className="admin-content-container">
                        <PayMethod 
                            returnHandleChange= {this.returnHandleChange.bind(this)}
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
        );
    }

    componentDidMount() {
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

    returnHandleChange = ( data ) => {
        this.setState({
            formObject: { ...this.state.formObject, ...data }
        })
    }

    hanleSubmit = (e) => {
        e.preventDefault();
        const { formObject } = this.state;
        const checkoutFormObject = {
            memberType: "vendor",
            memberIPAddress: formObject['memberIPAddress'], // 會員 IP
            orderCompanyName: formObject['company'], //公司名稱
            orderName: formObject['contactor'], // 訂購人姓名/承辦人
            orderEmail: formObject['email'], // 連絡信箱
            orderPhone: formObject['phone'], // 聯絡電話
            orderCellPhone: formObject['phone'], // 聯絡電話
            orderZipCode: formObject['zipcode'], // 訂購者/購買者的郵遞區號
            orderCity: formObject['city'], // 訂購者城市
            orderDist: formObject['district'], // 訂購者鄉縣市鎮區
            orderAddress: formObject['address'], // 訂購者地址明細
            purchaseTokens: JSON.parse(sessionStorage.getItem('vendorBuyProgram')), // 要上架的商品 id 列表
            payMethod: formObject['payMethod'], // cc, atm, cvs
            invoiceType: formObject['invoice']==""? 2:3, // 2,3,donate
            invoiceDonation: "", // 捐贈發票對象....
            invoiceCompanyUniNumber: formObject['invoice'], // 三聯式發票統編
            tripleCompanyName: formObject['company'], // 三聯式發票抬頭
            returnURL: "" // 完成購物付款後想要轉導向的頁面網址
        }

        this.props.dispatch( paymentAddOrder("", {}, checkoutFormObject) ).then( res => {
            switch( res['status'] ){
                case 200:
                    sessionStorage.setItem('vendorOrderId', res['data']['orderID'] );
                    sessionStorage.setItem('vendorOrderInfo', JSON.stringify(checkoutFormObject) );
                    sessionStorage.setItem('vendorOrderPaymentInfo', JSON.stringify(res['data']) );
                    this.props.history.push({
                        pathname: `/myvendor/program/product`,
                        search: `step=3`
                    });
                    break;

                default:
                    break;
            }
        });
    }

    actionBtn = ( val ) => {
        switch( val ){
            default:
                this.props.history.push('/myvendor/categories/product/review');
                break;
        }
    }
}

const mapStateToProps = state => {
    return{
        profile: state.vendor.info
    }
}

export default connect( mapStateToProps )( Step2 );