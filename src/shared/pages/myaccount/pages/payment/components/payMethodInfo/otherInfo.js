/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                     from 'react';
import { connect }               from 'react-redux';

const OtherInfo = props => {

    const { data } = props;
    const { payMethod, payAdditionalInfo } = data;
    
    switch( payMethod ){
        case 'atm':
            return(
                <>
                    <li>
                        <label>銀行代號</label>
                        <div>
                            <span className="highlight">
                                {payAdditionalInfo['BankCode']}
                            </span>
                        </div>
                    </li>
                    <li>
                        <label>匯款帳號</label>
                        <div>
                            <span className="highlight">
                                {payAdditionalInfo['VaccNo']}
                            </span>
                        </div>
                    </li>
                    <li>(請於訂單成立後24小時完成付款，若未完成付款訂單將會自動失效)</li>
                </>
            );

        case 'cvs':
            return(
                <>
                    <li>
                        <label>付款代碼</label>
                        <div>
                            <span className="highlight">{payAdditionalInfo['CVSCode']}</span>
                        </div>
                    </li>
                    <li>
                        <label>付款期限</label>
                        <div>{payAdditionalInfo['ExpireDate']} {payAdditionalInfo['ExpireTime']}</div>
                    </li>
                </>
            );

        default:
            return null;
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( OtherInfo );