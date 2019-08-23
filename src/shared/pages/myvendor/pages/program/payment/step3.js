import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';

// Actions
import { paymentResult } from '../../../../../actions/payment';

class Step3 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            orderID: "",
            resultInfo: {}
        }
    }

    render(){

        const { resultInfo } = this.state;
        console.log( resultInfo );

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>購買完成基本資料</h4>
                    </article>
                    <div className="admin-content-container">
                        <ul className="table-row-list">
                            <li>
                                <label>公司</label>
                                <div>{ resultInfo['orderCompanyName'] || "" }</div>
                            </li>
                            <li>
                                <label>聯絡人</label>
                                <div>{ resultInfo['orderName'] || "" }</div>
                            </li>
                            <li>
                                <label>信箱</label>
                                <div>{ resultInfo['orderEmail'] || "" }</div>
                            </li>
                            <li>
                                <label>聯絡電話</label>
                                <div>{ resultInfo['orderPhone'] || "" }</div>
                            </li>
                            <li>
                                <label>聯絡地址</label>
                                <div>{ `${resultInfo['orderZipCode'] || ""} ${resultInfo['orderCity'] || ""}${resultInfo['orderDist'] || ""}${resultInfo['orderAddress'] || ""}` }</div>
                            </li>
                            <li>
                                <label>付款方式</label>
                                <div>
                                    { resultInfo['payMethod'] || "" } 
                                    <span className={`payStatus ${resultInfo['paidStatus']}`}>
                                        {
                                            resultInfo['paidStatus']=='init'? (
                                                "尚未付款"
                                            ):(
                                                "付款完成"
                                            )
                                        }
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <article className="admin-content-title">
                        <h4>刊登同意書</h4>
                    </article>
                    <div className="admin-content-container">
                        我是同意書
                    </div>
                </section>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.setState({
            orderID: sessionStorage.getItem('vendorOrderId')
        },()=>{
            const { orderID } = this.state;
            const orderInfo = JSON.parse(sessionStorage.getItem('vendorOrderInfo'));
            this.props.dispatch( paymentResult( '',{orderID},{memberType:'vendor'} ) ).then( res => {
                this.setState({
                    resultInfo: { ...res['data'], ...orderInfo }
                })
            });
        })
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Step3 );