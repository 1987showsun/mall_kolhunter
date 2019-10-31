import React from 'react';
import dayjs from 'dayjs';
import queryString from 'query-string';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';

// Modules
import Loading from '../../../../../../module/loading';

// Actions
import { buyCaseBillInfo } from '../../../../../../actions/myvendor';

// Lang
import lang from '../../../../../../public/lang/lang.json';

class Info extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            info: []
        }
    }

    static getDerivedStateFromProps(props,state){
        return{
            info: props.info
        }
    }

    render(){
        const { loading, info } = this.state;
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
                                    <div>{info[0]['orderID']}</div>
                                </li>
                                <li>
                                    <label>購買人</label>
                                    <div>{info[0]['orderName']}</div>
                                </li>
                                <li>
                                    <label>聯絡信箱</label>
                                    <div>{info[0]['orderEmail']}</div>
                                </li>
                                <li>
                                    <label>聯絡電話</label>
                                    <div>{info[0]['orderPhone']}</div>
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
                                    <div>{dayjs(info[0]['createTimeMs']).format('YYYY/MM/DD hh:mm:ss')}</div>
                                </li>
                                <li>
                                    <label>付款時間</label>
                                    <div>
                                        { 
                                            info[0]['verifyTimeMs']!=null? (
                                                dayjs(info[0]['verifyTimeMs']).format('YYYY/MM/DD hh:mm:ss')
                                            ):(
                                                '尚未付款'
                                            )
                                        }
                                    </div>
                                </li>
                                <li>
                                    <label>付款方式</label>
                                    <div>{lang['zh-TW']['payment'][info[0]['payMethod']]}</div>
                                </li>
                                <li>
                                    <label>折價券</label>
                                    <div>
                                        {
                                            info[0]['orderDetail'][0]['couponCode']!=null? (
                                                "已使用"
                                            ):(
                                                "未使用"
                                            )
                                        }
                                    </div>
                                </li>
                                <li>
                                    <label>折價金額</label>
                                    <div><CurrencyFormat value={info[0]['discountAmount']} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                </li>
                                <li>
                                    <label>帳單狀態</label>
                                    <div>{lang['zh-TW']['orderStatus'][info[0]['orderStatus']]}</div>
                                </li>
                                <li>
                                    <label>實際金額</label>
                                    <div><CurrencyFormat value={info[0]['amount']-info[0]['discountAmount']} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                </li>
                                {
                                    info[0]['payMethod']=='atm' &&
                                        <React.Fragment>
                                            <li>
                                                <label>銀行代號</label>
                                                <div>{info[0]['payAdditionalInfo']['BankCode']}</div>
                                            </li>
                                            <li>
                                                <label>虛擬帳號</label>
                                                <div>{info[0]['payAdditionalInfo']['VaccNo']}</div>
                                            </li>
                                        </React.Fragment>
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
                                    <div>{ info[0]['orderDetail'][0]['program']['programTitle'] }</div>
                                </li>
                                <li>
                                    <label>方案上架數</label>
                                    <div>{info[0]['orderDetail'][0]['program']['itemNum']} / 1組</div>
                                </li>
                                <li>
                                    <label>方案金額</label>
                                    <div><CurrencyFormat value={info[0]['orderDetail'][0]['program']['price']} displayType={'text'} thousandSeparator={true} prefix={'$'} /> / 1組</div>
                                </li>
                                <li>
                                    <label>購買上架組數</label>
                                    <div>{ info[0]['orderDetail'][0]['programNum'] }</div>
                                </li>
                                <li>
                                    <label>總購買上架數</label>
                                    <div>{ info[0]['orderDetail'][0]['totalItemNum'] }</div>
                                </li>
                                <li>
                                    <label>總付款金額</label>
                                    <div><CurrencyFormat value={info[0]['amount']} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
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
        const { location, match } = this.props;
        const { pathname, search } = location;
        const orderID = match['params']['id'];
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