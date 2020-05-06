/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                         from 'react';
import { connect }                   from 'react-redux';
import { FontAwesomeIcon }           from '@fortawesome/react-fontawesome';
import { faChevronCircleRight}       from '@fortawesome/free-solid-svg-icons';

const Receiving = props => {

    const { info } = props;
    
    return(
        <div className="container-unit-row" data-flexwrap="wrap">
            <div className="container-unit-head">
                <h4><FontAwesomeIcon icon={faChevronCircleRight}/>收件人</h4>
            </div>
            <ul className="card-form-list">
                <li>
                    <label htmlFor="deliveryMethod">運送方式</label>
                    <div>宅配到府（下訂後請注意通知到貨陌生來電）</div>
                </li>
                <li>
                    <label htmlFor="name2">姓名</label>
                    <div>{info['deliveryName']}</div>
                </li>
                <li>
                    <label htmlFor="name2">電話</label>
                    <div>{info['deliveryPhone']}</div>
                </li>
                <li>
                    <label htmlFor="name2">信箱</label>
                    <div>{info['deliveryEmail']}</div>
                </li>
                <li>
                    <label htmlFor="name2">地址</label>
                    <div>{`${info['deliveryZipCode']||''} ${info['deliveryCity']||''}${info['deliveryDist']||''}${info['deliveryAddress']||''}`}</div>
                </li>
            </ul>
        </div> 
    );
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Receiving );