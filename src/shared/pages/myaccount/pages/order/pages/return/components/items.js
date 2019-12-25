/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */
import React,{ useState, useEffect } from 'react';
import { Link }                      from 'react-router-dom';
import { FontAwesomeIcon }           from '@fortawesome/react-fontawesome';
import { faCheck }                   from '@fortawesome/free-solid-svg-icons';

// Lang
import lang                          from '../../../../../../../public/lang/lang.json';

export default (props) => {

    const { itemCode, selected, productImgs, productName, specName, count, refundStatus, spec } = props;
    const [ stateChecked, setChecked ] = useState( selected.includes(itemCode) );

    useEffect(()=>{
        setChecked(  selected.includes(itemCode) );
    },[selected.includes(itemCode)])

    return(
        <>
            <div className="cell-checkbox">
                <label className={`checkbox ${stateChecked}`} htmlFor={itemCode}>
                    <input type="checkbox" id={itemCode} onChange={props.handleChange.bind(this,props)}/>
                    {
                        stateChecked &&
                            <div className="checked">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                    }
                </label>
            </div>
            <div className="cell-image">
                <img src={productImgs['path']} alt={productName} title="" />
            </div>
            <div className="cell-dosc">
                <h3><Link to="">{productName}</Link></h3>
                <div className="name">
                    <ul>
                        {
                            spec.length==0 &&
                                <li><label>商品型號：</label>{specName}</li>
                        }
                        <li><label>購買數量：</label>{count}</li>
                        <li><label>退貨狀態：</label>{lang['zh-TW']['refundStatusEnum'][refundStatus]}</li>
                        <li><label>商品類型：</label>{spec.length>0? '組合商品':'一般商品'}</li>
                    </ul>
                </div>
            </div>
        </>
    );
}