/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                                 from 'react';
import { Link }                              from 'react-router-dom';
import { connect }                           from 'react-redux';
import { FontAwesomeIcon }                   from '@fortawesome/react-fontawesome';
import { faArrowCircleRight }                from '@fortawesome/free-solid-svg-icons';

// Lang
import lang                          from '../../../../../../../../public/lang/lang.json';

class Item extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            itemNumMax: 10,
        }
    }

    render(){

        const { data, location } = this.props;
        const { productToken, specName, storeToken, storeName, productImgs, productName, count, deliveryName, deliveryPrice, price, deliveryStatus, spec } = data;
        
        return(

            <div className="cart-product-items">
                <figure className="product-item-figure">
                    <div className="img">
                        <img src={productImgs['path']} alt={productName} title=""/>
                    </div>
                    <figcaption>
                        <h3>
                            <Link to={`/detail/${productToken}`} target="_blank">
                                {data['productName']}
                            </Link>
                        </h3>
                        <ul className="product-item-doc-list">
                            {
                                spec.length==0 &&
                                    <li>
                                        <label>尺寸 / 型號</label>
                                        <div>{specName}</div>
                                    </li>
                            }
                            <li>
                                <label>消費網紅店家</label>
                                {
                                    storeToken==undefined || storeToken=="" ? (
                                        <div>Kolhunter</div>
                                    ):(
                                        <div><Link to={`/store/${storeToken}`} target="_blank">{storeName}</Link></div>
                                    )
                                }
                            </li>
                            <li>
                                <label>數量</label>
                                <div>{count}</div>
                            </li>
                            <li>
                                <label>運送方式</label>
                                <div>{`${deliveryName} ${deliveryPrice==0? "（免運）":`NT：$${deliveryPrice}`}`}</div>
                            </li>
                            <li>
                                <label>小計</label>
                                <div>{data['price']}</div>
                            </li>
                            <li>
                                <label>狀態</label>
                                <div>{ lang['zh-TW']['transport'][deliveryStatus]}</div>
                            </li>
                        </ul>
                    </figcaption>
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
                                                <p>{item['count']} x {item['specName']}</p>
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Item );