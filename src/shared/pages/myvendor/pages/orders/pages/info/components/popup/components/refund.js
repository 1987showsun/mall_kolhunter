/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                              from 'react';
import toaster                            from 'toasted-notes';
import queryString                        from 'query-string';
import { connect }                        from 'react-redux';

// Actions
import { changeRefund }                   from '../../../../../../../../../actions/myvendor';

const refundStep = ['request','choice'];

const Delivery = ({dispatch, location, oederData, itemData, handleCancel}) => {

    const handleAction = () => {

        const { pathname, search } = location;
        const data   = {
            refundType : 'delivery',
            orderID    : oederData['orderID'],
            detail     : [itemData['id']]
        }
        
        dispatch( changeRefund(pathname, {...queryString.parse(search)}, data, oederData) ).then( res => {

            let status      = "failure";
            let status_text = "變更失敗";

            if( res['status']==200 ){
                status      = 'success';
                status_text = '變更成功';
                handleCancel();
            }

            toaster.notify(
                <div className={`toaster-status ${status}`}>{status_text}</div>
            ,{
                position: 'bottom-right',
                duration: 3000
            });
        });
    }

    return(
        <>
            <div className="popup-head">
                <h3>物流派遣</h3>
            </div>
            <form>
                <ul className="table-row-list">
                    <li>是否派出物流前去取回退貨商品？</li>
                </ul>
                <ul className="action-ul">
                    <li><button type="button" className="cancel" onClick={handleCancel.bind(this)}>取消</button></li>
                    <li><button type="button" className="basic"  onClick={handleAction.bind(this)}>確定</button></li>
                </ul>
            </form>
        </>
    );
}

const Recived = ({dispatch, location, oederData, itemData, handleCancel}) => {

    const handleAction = () => {
        const { pathname, search } = location;
        const data   = {
            refundType : 'recived',
            orderID    : oederData['orderID'],
            detail     : [itemData['id']]
        }

        dispatch( changeRefund(pathname, {...queryString.parse(search)}, data, oederData) ).then( res => {

            let status      = "failure";
            let status_text = "變更失敗";

            if( res['status']==200 ){
                status      = 'success';
                status_text = '變更成功';
                handleCancel();
            }

            toaster.notify(
                <div className={`toaster-status ${status}`}>{status_text}</div>
            ,{
                position: 'bottom-right',
                duration: 3000
            });
        });
    }
    
    return(
        <>
            <div className="popup-head">
                <h3>回收狀態</h3>
            </div>
            <form>
                <ul className="table-row-list">
                    <li>是否已收到退貨商品？</li>
                </ul>
                <ul className="action-ul">
                    <li><button type="button" className="cancel" onClick={handleCancel.bind(this)}>取消</button></li>
                    <li><button type="button" className="basic"  onClick={handleAction.bind(this)}>已回收</button></li>
                </ul>
            </form>
        </>
    );
}

const Choice = ({dispatch, location, oederData, itemData, handleCancel}) => {

    const handleAction = (actionType) => {

        const { pathname, search } = location;
        const data   = {
            refundType : actionType,
            orderID    : oederData['orderID'],
            detail     : [itemData['id']]
        }

        dispatch( changeRefund(pathname, {...queryString.parse(search)}, data, oederData) ).then( res => {

            let status      = "failure";
            let status_text = "變更失敗";

            if( res['status']==200 ){
                status      = 'success';
                status_text = '變更成功';
                handleCancel();
            }

            toaster.notify(
                <div className={`toaster-status ${status}`}>{status_text}</div>
            ,{
                position: 'bottom-right',
                duration: 3000
            });
        });
    }

    return(
        <>
            <div className="popup-head">
                <h3>退貨決策</h3>
            </div>
            <form>
                <ul className="table-row-list">
                    <li>是否已檢查完退貨商品，同意會員退貨申請？</li>
                </ul>
                <ul className="action-ul">
                    <li><button type="button" className="cancel" onClick={handleCancel.bind(this)}>取消</button></li>
                    <li><button type="button" className="basic"  onClick={handleAction.bind(this,'reject')}>拒絕退貨</button></li>
                    <li><button type="button" className="basic"  onClick={handleAction.bind(this,'approve') }>同意退貨</button></li>
                </ul>
            </form>
        </>
    );
}

const Refund = ({dispatch, location={}, handleCancel, oederData, itemData}) => {

    const { refundStatus } = itemData;
    const idx    = refundStep.findIndex( item => item==refundStatus);
    
    switch( refundStep[idx+1] ){
        case 'delivery':
            return (
                <Delivery
                    dispatch     = {dispatch}
                    location     = {location}
                    itemData     = {itemData}
                    oederData    = {oederData}
                    handleCancel = {handleCancel}
                />
            );

        case 'recived':
            return (
                <Recived 
                    dispatch     = {dispatch}
                    location     = {location}
                    itemData     = {itemData}
                    oederData    = {oederData}
                    handleCancel = {handleCancel}
                />
            );

        default:
            return (
                <Choice 
                    dispatch     = {dispatch}
                    location     = {location}
                    itemData     = {itemData}
                    oederData    = {oederData}
                    handleCancel = {handleCancel}
                />
            );
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect(mapStateToProps)(Refund);