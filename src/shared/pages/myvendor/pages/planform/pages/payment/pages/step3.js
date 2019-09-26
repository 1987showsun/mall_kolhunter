import React from 'react';
import dayjs from 'dayjs';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Mudoles
import Table from '../../../../../../../module/table';

// Actions
import { ordersInfo } from '../../../../../../../actions/payment';

// Lang
import lang from '../../../../../../../public/lang/lang.json';

class Step3 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            orderID: "",
            resultInfo: {},
            tableHeadData: [
                {
                    key: 'title',
                    type: 'text',
                    title: '方案名稱'
                },
                {
                    key: 'programNum',
                    type: 'number',
                    title: '購買數量'
                },
                {
                    key: 'total',
                    type: 'number',
                    title: '總金額'
                }
            ],
            tableBodyData: []
        }
    }

    render(){

        const { tableBodyData, tableHeadData, resultInfo } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>購買完成基本資料</h4>
                    </article>
                    <div className="admin-content-container">
                        <ul className="table-row-list">
                            <li>
                                <label>公司</label>
                                <div>{ resultInfo['orderName'] || "" }</div>
                            </li>
                            <li>
                                <label>聯絡人</label>
                                <div>{ resultInfo['orderName'] || "" }</div>
                            </li>
                            <li>
                                <label>信箱</label>
                                <div>{ resultInfo['orderEmail'] || "" }</div>
                            </li>
                            <li>
                                <label>聯絡電話</label>
                                <div>{ resultInfo['orderPhone'] || "" }</div>
                            </li>
                            <li>
                                <label>購買時間</label>
                                <div>{dayjs(resultInfo['verifyTimeMs'] || "").format('YYYY/MM/DD')}</div>
                            </li>
                            <li>
                                <label>付款狀態</label>
                                <div>
                                    <span className={`payStatus ${resultInfo['orderStatus']}`}>
                                        { lang['zh-TW']['orderStatus'][resultInfo['orderStatus']] || "" }
                                    </span>
                                </div>
                            </li>
                            <li>
                                <label>付款方式</label>
                                <div>
                                    { lang['zh-TW']['payment'][resultInfo['payMethod']] || "" } 
                                </div>
                            </li>
                            {
                                resultInfo['payMethod']=='atm' &&
                                    <li>
                                        <label>虛擬繳款帳號</label>
                                        {
                                            resultInfo['payAdditionalInfo']!=null?(
                                                <div>{resultInfo['payAdditionalInfo']['BankCode']} {resultInfo['payAdditionalInfo']['VaccNo']}</div>
                                            ):(
                                                <div></div>
                                            )
                                        }
                                    </li>
                            }
                        </ul>
                    </div>
                </section>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>商品列表</h4>
                    </article>
                    <Table 
                        tableHeadData= {tableHeadData}
                        tableBodyData= {tableBodyData}
                    />
                </section>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>刊登同意書</h4>
                    </article>
                    <div className="admin-content-container">
                        我是同意書
                    </div>
                </section>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, history, match } = this.props;
        const { pathname, search } = location;
        const query = queryString.parse(search);
        sessionStorage.removeItem(`vendorBuyPlanform`);
        if( query['orderID']==undefined ){
            history.push({
                pathname: '/myvendor/planform/list'
            })
        }else{
            this.props.dispatch( ordersInfo(pathname, {...queryString.parse(search)}, {memberType: 'vendor'}) ).then( res => {
                switch( res['status'] ){
                    case 200:

                        const tableBodyData = res['data']['orderDetail'].map( item => {
                            return {
                                id: item['purchaseToken'] || "",
                                title: item['program']['programTitle']  || "",
                                programNum: item['programNum']  || 0,
                                total: item['program']['price']*item['programNum']  || 0
                            }
                        })

                        this.setState({
                            resultInfo: res['data'],
                            tableBodyData
                        })
                        break;

                    default:
                        break;
                }
            });
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Step3 );