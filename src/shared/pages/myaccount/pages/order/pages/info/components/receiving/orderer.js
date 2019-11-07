/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                         from 'react';
import { connect }                   from 'react-redux';
import { FontAwesomeIcon }           from '@fortawesome/react-fontawesome';
import { faChevronCircleRight}       from '@fortawesome/free-solid-svg-icons';

const Orderer = props => {

    const { info } = props;
    
    return(
        <div className="container-unit-row" data-flexwrap="wrap">
            <div className="container-unit-head">
                <h4><FontAwesomeIcon icon={faChevronCircleRight}/>訂購人</h4>
            </div>
            <ul className="card-form-list">
                <li>
                    <label htmlFor="name2">姓名</label>
                    <div>{info['orderName']}</div>
                </li>
                <li>
                    <label htmlFor="name2">電話</label>
                    <div>{info['orderPhone']}</div>
                </li>
                <li>
                    <label htmlFor="name2">信箱</label>
                    <div>{info['orderEmail']}</div>
                </li>
            </ul>
        </div> 
    );
}

const mapStateToProps = state => {
    return{
    }
}

export default connect( mapStateToProps )( Orderer );