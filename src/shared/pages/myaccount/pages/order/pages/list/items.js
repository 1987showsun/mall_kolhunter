/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                       from 'react';
import dayjs                       from 'dayjs'
import { Link }                    from 'react-router-dom';
import { FontAwesomeIcon }         from '@fortawesome/react-fontawesome';
import { faPlus, faInfoCircle, faUndoAlt, faCommentDots }from '@fortawesome/free-solid-svg-icons';

// Components
import TableOrder                  from '../../../../../../components/orderProductTable';

// Lang
import lang                        from '../../../../../../public/lang/lang.json';

export default class Items extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ...props
        }
    }

    render(){

        const { refundAble } = this.state;

        return(
            <section className="container-unit">
                <div className="order-head-wrap">
                    <input type="checkbox" name="order-info-switch" id={this.state.orderID} className="order-info-switch"/>
                    <label htmlFor={this.state.orderID} className="order-info-label">
                        <ul>
                            <li>
                                <span className="lable">訂單編號</span>{this.state.orderID}
                            </li>
                            <li>
                                <span className="lable">付款狀態</span>{lang['zh-TW']['orderStatus'][this.state.orderStatus]}
                            </li>
                        </ul>
                        <i className="icon">
                            <FontAwesomeIcon icon={faPlus} />
                        </i>
                    </label>
                    <ul className="table-row-list">
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
                        <li><Link to={`/myaccount/orders/info/${this.state.orderID}`}><i><FontAwesomeIcon icon={faInfoCircle}/></i>購買明細</Link></li>
                        {
                            refundAble &&
                                <li><Link to={`/myaccount/orders/return/${this.state.orderID}`}><i><FontAwesomeIcon icon={faUndoAlt}/></i>退貨申請</Link></li>
                        }
                        {/* <li><Link to={`/myaccount/orders/message/${this.state.orderID}`}><i><FontAwesomeIcon icon={faCommentDots}/></i>我要詢問</Link></li> */}
                    </ul>
                </div>
            </section>
        )
    }
}