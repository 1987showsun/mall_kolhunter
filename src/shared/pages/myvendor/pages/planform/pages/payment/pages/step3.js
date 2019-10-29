import React from 'react';
import dayjs from 'dayjs';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Mudoles
import Table from '../../../../../../../module/table';
import Loading from '../../../../../../../module/loading';

// Actions
import { vinfo } from '../../../../../../../actions/myvendor';
import { ordersInfo } from '../../../../../../../actions/payment';

// Lang
import lang from '../../../../../../../public/lang/lang.json';

class Step3 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
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

        const { loading, tableBodyData, tableHeadData, resultInfo } = this.state;

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
                                <div>{ resultInfo['verifyTimeMs']!=undefined? dayjs(resultInfo['verifyTimeMs']).format('YYYY/MM/DD'):"" }</div>
                            </li>
                            <li>
                                <label>付款狀態</label>
                                <div>
                                    <span className={`payStatus ${resultInfo['orderStatus']}`} style={{marginLeft: '0px'}}>
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
                                                <div>{resultInfo['payAdditionalInfo']['BankCode']} {resultInfo['payAdditionalInfo']['VaccNo']} (請於訂單成立後24小時完成付款，若未完成付款訂單將自動失效)</div>
                                            ):(
                                                <div></div>
                                            )
                                        }
                                    </li>
                            }
                        </ul>
                        <Loading loading={loading} />
                    </div>
                </section>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>所購買方案</h4>
                    </article>
                    <div className="admin-content-container">
                        <Table 
                            tableHeadData= {tableHeadData}
                            tableBodyData= {tableBodyData}
                        />
                        <Loading loading={loading} />
                    </div>
                </section>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>刊登同意書</h4>
                    </article>
                    <div className="admin-content-container">
                        我是同意書
                        <Loading loading={loading} />
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
            this.setState({
                loading: true
            },()=>{
                clearTimeout( this.delayCallAPI );
                this.delayCallAPI = setTimeout(()=>{
                    // 取得訂單資訊
                    this.props.dispatch( ordersInfo(pathname, {...queryString.parse(search)}, {memberType: 'vendor'}) ).then( res => {
                        this.setState({
                            loading: false
                        },()=>{
                            switch( res['status'] ){
                                case 200:
                                    const tableBodyData = res['data']['orderDetail'].map( item => {
                                        return {
                                            id         : item['purchaseToken'] || "",
                                            title      : item['program']['programTitle']  || "",
                                            programNum : item['programNum']  || 0,
                                            total      : item['program']['price']*item['programNum']  || 0
                                        }
                                    })

                                    this.setState({
                                        resultInfo: res['data'],
                                        tableBodyData
                                    },()=>{
                                        this.props.dispatch( vinfo() );
                                    })
                                    break;

                                default:
                                    break;
                            }
                        })
                    });
                },1000);
            })
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Step3 );