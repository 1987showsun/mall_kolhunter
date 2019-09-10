import React from 'react';
import dayjs from 'dayjs'
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Components
import TableOrder from '../../../../../components/orderProductTable';

// Lang
import lang from '../../../../../public/lang/lang.json';

export default class Items extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ...props
        }
    }

    render(){
        return(
            <section className="container-unit">
                <div className="order-head-wrap">
                    <input type="checkbox" name="order-info-switch" id={this.state.orderID} className="order-info-switch"/>
                    <label htmlFor={this.state.orderID} className="order-info-label">
                        <span className="lable">訂單編號</span>{this.state.orderID}
                        <i className="icon">
                            <FontAwesomeIcon icon={faPlus} />
                        </i>
                    </label>
                    <ul className="table-row-list">
                        <li>
                            <label>付款狀態</label>
                            <div>{ lang['zh-TW']['orderStatus'][this.state.orderStatus] }</div>
                        </li>
                        <li>
                            <label>購買方式</label>
                            <div>{ lang['zh-TW']['payment'][this.state.payMethod] }</div>
                        </li>
                        <li>
                            <label>購買數量</label>
                            <div>{ this.state.orderDetail.length }</div>
                        </li>
                        <li>
                            <label>購買日期</label>
                            <div>{dayjs(this.state.createTimeMs).format("YYYY / MM / DD")}</div>
                        </li>
                    </ul>
                </div>
                <TableOrder 
                    tableBodyData= {this.state.orderDetail}
                />
                <div className="order-action-wrap">
                    <ul>
                        <li><Link to={`/myaccount/orders/return/${this.state.orderID}`}>退貨 / 取消</Link></li>
                        <li><Link to={`/myaccount/orders/message/${this.state.orderID}`}>我要詢問</Link></li>
                    </ul>
                </div>
            </section>
        )
    }
}