/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React, { useState }                from 'react';
import toaster                            from 'toasted-notes';
import { connect }                        from 'react-redux';

// Actions
import { orderInfoProductDeliveryStatus } from '../../../../../../../../../actions/myvendor';

// Lang
import lang                               from '../../../../../../../../../public/lang/lang.json';

const deliveryStep     = ['init','prepare','ontheway','arrived'];
const showDeliveryCode = ['prepare','ontheway'];

const Delivery = ({dispatch, location={}, handleCancel, oederData, itemData}) => {
    const [stateForm, setForm] = useState({
        orderID             : oederData['orderID'],
        id                  : itemData['id'],
        itemCode            : itemData['itemCode'],
        deliveryCompany     : itemData['deliveryCompany'] ? itemData['deliveryCompany'] : lang['zh-TW']['deliveryCompany']['1'],
        deliveryCode        : itemData['deliveryCode'],
        deliveryStatus      : itemData['deliveryStatus'],
        loading: false
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...stateForm,
            [name]     : value
        });

    }

    const onSubmit     = (e) => {
        e.preventDefault();
        const { pathname } = location;        
        if (stateForm['loading']==false) {
            stateForm['loading'] = true;
            dispatch( orderInfoProductDeliveryStatus(pathname, {}, stateForm, oederData) ).then(res => {

                let status      = "failure";
                let status_text = "變更失敗";

                if( res['status']==200 ){
                    status      = 'success';
                    status_text = '變更成功';
                    setForm(stateForm);
                    handleCancel();
                }

                toaster.notify(
                    <div className={`toaster-status ${status}`}>{status_text}</div>
                ,{
                    position: 'bottom-right',
                    duration: 3000
                });
                stateForm['loading'] = false;
            });
        }
        
    }

    const checkOptionDisabled = ( keys,i ) => {
        const { deliveryStatus }      = itemData;
        const nowdeliveryStatusIndex  = deliveryStep.findIndex( keys => keys==deliveryStatus );
        return <option key={keys} value={keys} disabled={i<=nowdeliveryStatusIndex}>{lang['zh-TW']['deliveryStatus'][keys]}</option>;
    }

    return(
        <>
            <div className="popup-head">
                <h3>{itemData['productName']} - 運送進度</h3>
            </div>
            <form onSubmit={onSubmit.bind(this)}>
                <ul className="table-row-list">
                    <li>
                        <label>運送狀態</label>
                        <div className="input-box select">
                            <select name="deliveryStatus" defaultValue={stateForm['deliveryStatus']} onChange={handleChange.bind(this)}>
                                {
                                    Object.keys(lang['zh-TW']['deliveryStatus']).map( (keys,i) => {
                                        return checkOptionDisabled(keys,i);
                                    })
                                }
                            </select>
                        </div>
                    </li>
                    {
                        showDeliveryCode.includes(stateForm['deliveryStatus'])?(
                            <>
                                <li>
                                    <label>貨運公司</label>
                                    <div className="input-box select">
                                        <select name="deliveryCompany" defaultValue={stateForm['deliveryCompany']} onChange={handleChange.bind(this)}>
                                            {
                                                Object.keys(lang['zh-TW']['deliveryCompany']).map( (keys,i) => {
                                                    return (<option key={lang['zh-TW']['deliveryCompany'][keys]} value={lang['zh-TW']['deliveryCompany'][keys]}>{lang['zh-TW']['deliveryCompany'][keys]}</option>);
                                                })
                                            }
                                        </select>
                                    </div>
                                </li>
                                <li>
                                    <label>包裹編號</label>
                                    <div className="input-box">
                                        <input type="text" name="deliveryCode" defaultValue={stateForm['deliveryCode']} onChange={handleChange.bind(this)} placeholder="請輸入包裹編號" />
                                    </div>
                                </li>
                            </>
                        ):(
                            null
                        )
                    }
                </ul>
                <ul className="action-ul">
                    <li><button type="button" className="cancel" onClick={handleCancel.bind(this)}>取消</button></li>
                    <li><button type="submit" className="basic">確定</button></li>
                </ul>
            </form>
        </>
    );
}

const mapStateToProps = state => {
    return{

    }
}

export default connect(mapStateToProps)(Delivery);