/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React               from 'react';
import queryString         from 'query-string';
import CurrencyFormat      from 'react-currency-format';
import { connect }         from 'react-redux';

// Modules
import Loading             from '../../../../../../module/loading';

// Actions
import { buyCaseBillInfo } from '../../../../../../actions/myvendor';

class Info extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading       : false,
            info          : []
        }
    }

    static getDerivedStateFromProps(props,state){
        return{
            info          : props.info
        }
    }

    render(){

        const { loading, info } = this.state;
        const {
            orderID           = 'N/A',
            orderName         = 'N/A',
            orderEmail        = 'N/A',
            orderPhone        = 'N/A',
            payMethod         = 'N/A',
            payAdditionalInfo = {},
            methodText        = 'N/A',
            orderStatus       = '',
            statusText        = 'N/A',
            orderDetail       = [],
            amount            = 0,
            discountAmount    = 0,
            createTimeMs      = 'N/A',
            verifyTimeMs      = '尚未付款'
        } = info;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>基本資料</h4>
                    </article>
                    {
                        info.length!=0?(
                            <ul className="table-row-list">
                                <li>
                                    <label>帳單編號</label>
                                    <div>{orderID}</div>
                                </li>
                                <li>
                                    <label>購買人</label>
                                    <div>{orderName}</div>
                                </li>
                                <li>
                                    <label>聯絡信箱</label>
                                    <div>{orderEmail}</div>
                                </li>
                                <li>
                                    <label>聯絡電話</label>
                                    <div>{orderPhone}</div>
                                </li>
                            </ul>
                        ):(
                            <Loading loading={loading} />
                        )
                    }
                </section>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>付款資料</h4>
                    </article>
                    {
                        info.length!=0?(
                            <ul className="table-row-list">
                                <li>
                                    <label>購買時間</label>
                                    <div>{createTimeMs}</div>
                                </li>
                                <li>
                                    <label>付款時間</label>
                                    <div>{verifyTimeMs}</div>
                                </li>
                                <li>
                                    <label>付款方式</label>
                                    <div>{methodText}</div>
                                </li>
                                <li>
                                    <label>折價券</label>
                                    <div>
                                        {
                                            orderDetail.length!=0 && orderDetail[0]['couponCode']!=null? (
                                                "已使用"
                                            ):(
                                                "未使用"
                                            )
                                        }
                                    </div>
                                </li>
                                <li>
                                    <label>折價金額</label>
                                    <div><CurrencyFormat value={discountAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                </li>
                                <li>
                                    <label>帳單狀態</label>
                                    <div>
                                        <span className={`orderStatus ${orderStatus}`}>{statusText}</span>
                                    </div>
                                </li>
                                <li>
                                    <label>實際金額</label>
                                    <div>
                                        <CurrencyFormat value={amount-discountAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </div>
                                </li>
                                {
                                    payMethod=='atm' && payAdditionalInfo!=null?(
                                        <>
                                            <li>
                                                <label>銀行代號</label>
                                                <div>{payAdditionalInfo['BankCode']}</div>
                                            </li>
                                            <li>
                                                <label>虛擬帳號</label>
                                                <div>{payAdditionalInfo['VaccNo']}</div>
                                            </li>
                                        </>
                                    ):(
                                        null
                                    )
                                }
                            </ul>
                        ):(
                            <Loading loading={loading} />
                        )
                    }
                </section>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>所購買方案</h4>
                    </article>
                    {
                        info.length!=0?(
                            <ul className="table-row-list">
                                <li>
                                    <label>方案名稱</label>
                                    <div>{ orderDetail.length!=0? orderDetail[0]['program']['programTitle']:null }</div>
                                </li>
                                <li>
                                    <label>方案上架數</label>
                                    <div>{ orderDetail.length!=0? orderDetail[0]['program']['itemNum']:null } / 1組</div>
                                </li>
                                <li>
                                    <label>方案金額</label>
                                    <div>
                                        <CurrencyFormat value={orderDetail.length!=0? orderDetail[0]['program']['price'] : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} /> / 1組
                                    </div>
                                </li>
                                <li>
                                    <label>購買上架組數</label>
                                    <div>{ orderDetail.length!=0? orderDetail[0]['programNum']:null }</div>
                                </li>
                                <li>
                                    <label>總購買上架數</label>
                                    <div>{ orderDetail.length!=0? orderDetail[0]['totalItemNum']:null }</div>
                                </li>
                                <li>
                                    <label>總付款金額</label>
                                    <div>
                                        <CurrencyFormat value={ amount } displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </div>
                                </li>
                            </ul>
                        ):(
                            <Loading loading={loading} />
                        )
                    }
                </section>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, match }  = this.props;
        const { pathname, search } = location;
        const orderID              = match['params']['id'];
        this.setState({
            loading: true,
        },()=>{
            this.props.dispatch( buyCaseBillInfo(pathname,{...queryString.parse(search), orderID}) ).then( res => {
                this.setState({
                    loading: false,
                })
            });
        })
    }
    
}

const mapStateToProps = state => {
    return{
        info: state.myvendor.billInfo
    }
}

export default connect( mapStateToProps )( Info );