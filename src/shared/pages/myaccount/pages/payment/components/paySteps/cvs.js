/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                     from 'react';
import dayjs                     from 'dayjs';
import { connect }               from 'react-redux';

const CvsSteps = props => {

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
                        繳款代碼
                    </div>
                    <div className="divTableCol content">
                        <strong>{payAdditionalInfo['CVSCode']}</strong>
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
                        請就近擇一四大超商，列印繳款單繳款，繳款時只要依照以下步驟，就能輕鬆完成付款。
                        <br />
                        <a target="_blank" href="https://www.newebpay.com/info/site_description/seven_ibon_teach">觀看ibon繳款流程圖></a>
                        <br />
                        <a target="_blank" href="https://www.newebpay.com/info/site_description/family_teach">觀看FamiPort繳款流程圖></a>
                        <br />
                        <a target="_blank" href="https://www.newebpay.com/info/site_description/hilife_teach">觀看Life-ET繳款流程圖></a>
                        <br />
                        <a target="_blank" href="https://www.newebpay.com/info/site_description/okmart_teach">觀看OK-go繳款流程圖></a>
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

export default connect( mapStateToProps )( CvsSteps );