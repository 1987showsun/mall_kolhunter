/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                     from 'react';
import dayjs                     from 'dayjs';
import { connect }               from 'react-redux';

const AtmSteps = props => {

    const { data } = props;
    const { payAdditionalInfo } = data;

    return(
        <section className="container-unit">
            <div className="unit-head">
                <h3>繳款資訊</h3>
            </div>
            <div className="divTable">
                <div className="divTableRow">
                    <div className="divTableCol label">
                        繳款說明
                    </div>
                    <div className="divTableCol content">
                        1.請您注意，下面的『轉帳帳號』專屬於網紅電商本次交易，您只能在這次使用喔！<br />
                        2.繳款期限不受例假日影響，僅需要在繳費期限內完成付款即可喔。<br />
                        3.若在繳款期限內未完成繳款，此筆訂單即失效需重新下單。
                    </div>
                </div>
                <div className="divTableRow">
                    <div className="divTableCol label">
                        繳款期限
                    </div>
                    <div className="divTableCol content">
                        繳款期限 請您在繳費期限<strong className="red">{dayjs(payAdditionalInfo['ExpireTimeMs']).format("YYYY年MM月DD日HH點mm分")}</strong>以前繳費，您越早完成繳費動作，我們就能優先處理您的訂單喔！
                    </div>
                </div>
                <div className="divTableRow">
                    <div className="divTableCol label">
                        繳款方式
                    </div>
                    <div className="divTableCol content">
                        請您就近選擇任一部金融行庫或郵局的ATM自動提款機轉帳繳款，只要輸入下列19個數字及轉帳金額，就能輕鬆完成付款。
                        <br />
                        <br />
                        <div className="divTable vacInfo">
                            <div className="divTableRow">
                                <div className="divTableCol label">
                                    轉帳銀行代號
                                </div>
                                <div className="divTableCol content">
                                    <strong>{payAdditionalInfo['BankCode']}</strong>(這是華南銀行代碼，共3位)
                                </div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCol label">
                                    轉帳帳號
                                </div>
                                <div className="divTableCol content">
                                    <strong>{payAdditionalInfo['VaccNo']}</strong>
                                </div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCol label">
                                    應繳金額
                                </div>
                                <div className="divTableCol content">
                                    新台幣 <strong className="red">${data['amount']}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( AtmSteps );