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

import lang  from '../../../../../../../public/lang/lang.json';

export default ({list, updateDelivery, updateDeliveryAll, cancel, submit, uploadDone}) => {
    return(
        <>
            <div className="popup-head">
                <h3>批次更新</h3>
                <div>
                    {
                        !uploadDone ? (
                            <>
                                <button className="cancel" onClick={()=>cancel()}>取消</button>
                                <button className="submit" onClick={()=>submit()}>確定</button>
                            </>
                        ):(
                            <button className="cancel" onClick={()=>cancel()}>關閉</button>
                        )
                    }
                    
                </div>
            </div>
            <div className="operations">
                <div className="input-box select">
                    <select name="deliveryCompany" defaultValue="" onChange={e=>{updateDeliveryAll(e.target.value)}}>
                        <option value="" disabled={true}>- 設定全部貨運公司 -</option>
                        {
                            Object.keys(lang['zh-TW']['deliveryCompany']).map( (keys,i) => {
                                return (<option key={lang['zh-TW']['deliveryCompany'][keys]} value={lang['zh-TW']['deliveryCompany'][keys]}>{lang['zh-TW']['deliveryCompany'][keys]}</option>);
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
                        return (<Tbody
                            key={`${item['orderID']}-${item['itemCode']}-${item['deliveryCompany']}`}
                            index={i}
                            updateDelivery={updateDelivery.bind(this)}
                            {...item}
                        />);
                    })
                }
            </Table>
        </>
    );
}