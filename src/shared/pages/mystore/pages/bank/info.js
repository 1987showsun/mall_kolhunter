/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React, { useState, useEffect }  from 'react';
import { FontAwesomeIcon }             from '@fortawesome/react-fontawesome';
import { faExclamationCircle }         from '@fortawesome/free-solid-svg-icons';

export default ({data}) => {

    const checkHasData = Object.keys( data ).some( keys => {
        return data[keys]!=null;
    })

    return(
        <>
            <span className="warn text-center">
                <i><FontAwesomeIcon icon={faExclamationCircle} /></i>
                分潤金額匯款採半月結的方式處理，每月分別於10號、25號進行匯款。
            </span>
            {
                checkHasData? (
                    <ul className="table-row-list">
                        <li>
                            <label htmlFor="">帳戶名稱</label>
                            <div>
                                { data['bankAccountName'] || "" }
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">身分證字號</label>
                            <div>
                                { data['socialID'] || "" }
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">銀行名稱</label>
                            <div>
                                { data['bankName'] || "" }
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">銀行代號</label>
                            <div>
                                { data['bankCode'] || "" }
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">分行名稱</label>
                            <div>
                                { data['bankBranch'] || "" }
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">帳號</label>
                            <div>
                                { data['bankAccount'] || "" }
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">公司名稱</label>
                            <div>
                                { data['companyName'] || "" }
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">公司統編</label>
                            <div>
                                { data['companyUniNum'] || "" }
                            </div>
                        </li>
                    </ul>
                ):(
                    <div className="container-unit-null">未填寫銀行資料，請點選編輯進行填寫</div>
                )
            }
        </>
    );
}