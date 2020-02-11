/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';

// Components
import Thead from './thead';
import Tbody from './tbody';

// Modules
import Table from '../../../../../../../module/table-new';

export default ({list, updateDelivery, updateDeliveryAll, submit}) => {
    const availableDeliveryCo = [
        "黑貓宅急便",
        "新竹貨運",
        "大榮貨運",
        "順豐速運"
    ]
    return(
        <>
            <div className="popup-head">
                <h3>批次更新</h3>
                <button className="submit" onClick={()=>submit()}>確定</button>
            </div>
            <div className="operations">
                <div className="input-box select">
                    <select name="deliveryCompany" defaultValue="" onChange={e=>{updateDeliveryAll(e.target.value)}}>
                        <option value="" disabled={true}>- 設定全部物流公司 -</option>
                        {
                            availableDeliveryCo.map( (val) => {
                                return (<option value={val}>{val}</option>)
                            })
                        }
                    </select>
                </div>
                {/* <button onClick={()=>updateDeliveryAll('黑貓宅急便')}>黑貓宅急便</button> */}
                {/* <button onClick={()=>updateDeliveryAll('大榮貨運')}>大榮貨運</button> */}
                {/* <button onClick={()=>updateDeliveryAll('新竹貨運')}>新竹貨運</button> */}
                {/* <button onClick={()=>updateDeliveryAll('順豐速運')}>順豐速運</button> */}
            </div>
            <Table 
                thead = {<Thead />}
            >
                {
                    list.map( (item, i) => {
                        item['i'] = i
                        return (<Tbody
                            key={`${item['orderID']}-${item['detailID']}-${item['deliveryCompany']}`}
                            availableDeliveryCo={availableDeliveryCo}
                            updateDelivery={updateDelivery.bind(this)}
                            {...item}
                        />);
                    })
                }
            </Table>
        </>
    );
}