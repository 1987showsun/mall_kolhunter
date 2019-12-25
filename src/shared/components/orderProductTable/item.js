/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                                 from 'react';
import CurrencyFormat                        from 'react-currency-format';
import { Link }                              from 'react-router-dom';
import { FontAwesomeIcon }                   from '@fortawesome/react-fontawesome';
import { faArrowCircleRight }                from '@fortawesome/free-solid-svg-icons';

// Lang
import lang from '../../public/lang/lang.json';

export default class Item extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ...props
        }
    }

    render(){

        const { productImgs, productToken, productName, specName, specToken, deliveryStatus, refundStatus, count, amount, spec } = this.state;

        return(
            <li className="order-body">
                <figure>
                    <div className="img-wrap">
                        <img src={productImgs['path']} title="" />
                    </div>
                    <div className="order-name">
                        <h3><Link to={`/detail/${productToken}`} target="_blank">{productName}</Link></h3>
                        <span className="span-row">尺寸/型號/顏色：{specName}</span>
                        <span className="span-row">產品編號：{specToken}</span>
                    </div>
                    <div>{ lang['zh-TW']['deliveryStatus'][deliveryStatus]}</div>
                    <div className="order-refundStatus">{ lang['zh-TW']['refundStatusEnum'][refundStatus] }</div>
                    <div><CurrencyFormat value={count}  displayType={'text'} thousandSeparator={true}/></div>
                    <div><CurrencyFormat value={amount} displayType={'text'} thousandSeparator={true}/></div>
                </figure>
                {
                    spec.length>=2? (
                        <div className="subproject-wrap">
                            <div className="subproject-head">
                                <i><FontAwesomeIcon icon={faArrowCircleRight}/></i>
                                <h3>組合商品明細</h3>
                            </div>
                            {
                                spec.map((item,i) => {
                                    return(
                                        <div key={item['specToken']} className="subproject-items">
                                            <div className="sort">
                                                {String(i+1).length<2? (`0${i+1}`):(i+1)}
                                            </div>
                                            <div className="name">
                                                <p>{item['productName']}</p>
                                            </div>
                                            <div className="spec">
                                                <p>{item['specName']}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ):(
                        null
                    )
                }
            </li>
        );
    }
}