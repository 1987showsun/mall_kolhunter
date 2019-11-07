/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                         from 'react';
import { Link }                      from 'react-router-dom';
import { connect }                   from 'react-redux';

// Lang
import lang                          from '../../../../../../public/lang/lang.json';

class Item extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            itemNumMax: 10,
        }
    }

    render(){

        const { data, location } = this.props;
        
        return(
            <figure className="product-item-figure">
                <div className="img">
                    <img src={data['image']} alt={data['productName']} title=""/>
                </div>
                <figcaption>
                    <h3>
                        <Link to={`/detail/${data['productToken']}`} target="_blank">
                            {data['productName']}
                        </Link>
                    </h3>
                    <ul className="product-item-doc-list">
                        <li>
                            <label>尺寸 / 型號</label>
                            <div>{data['specName']}</div>
                        </li>
                        <li>
                            <label>消費網紅店家</label>
                            {
                                data['storeToken']==undefined || data['storeToken']=="" ? (
                                    <div>Kolhunter</div>
                                ):(
                                    <div><Link to={`/store/${data['storeToken']}`} target="_blank">{data['storeName']}</Link></div>
                                )
                            }
                        </li>
                        <li>
                            <label>數量</label>
                            <div>{data['count']}</div>
                        </li>
                        <li>
                            <label>運送方式</label>
                            <div>{`${data['deliveryName']} ${data['deliveryPrice']==0? "（免運）":`NT：$${data['deliveryPrice']}`}`}</div>
                        </li>
                        <li>
                            <label>小計</label>
                            <div>{data['price']}</div>
                        </li>
                        <li>
                            <label>狀態</label>
                            <div>{ lang['zh-TW']['transport'][data['deliveryStatus']]}</div>
                        </li>
                    </ul>
                </figcaption>
            </figure>
        )
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Item );