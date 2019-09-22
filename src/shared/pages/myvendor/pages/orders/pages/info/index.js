import React from 'react';
import dayjs from 'dayjs';
import queryString from 'query-string';
import { connect } from 'react-redux';

//Compoents
import Table from '../../../../../../module/table';

// Actions
import { orderInfo } from '../../../../../../actions/myvendor';

// Lang
import lang from '../../../../../../public/lang/lang.json';

class Info extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            info: props.info,
            tableHeadKey : [
                {
                    key: 'id',
                    type: 'text',
                    title: '商品編號'
                },
                {
                    key: 'name',
                    type: 'text',
                    title: '商品名稱',
                    className: 'table-min-width'
                },
                {
                    key: 'quantity',
                    type: 'number',
                    title: '數量'
                },
                {
                    key: 'spec',
                    type: 'text',
                    title: '顏色 / 尺寸'
                },
                {
                    key: 'deliveryStatus',
                    type: 'text',
                    title: '運送狀態'
                },
                {
                    key: 'refundStatus',
                    type: 'text',
                    title: '退換貨'
                },
                {
                    key: 'total',
                    type: 'number',
                    title: '總額'
                }
            ],
            orderDetail: []
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            info: props.info
        }
    }

    render(){

        let orderDetail = [];
        const { info, tableHeadKey } = this.state;
        if( info['orderDetail']!=undefined ){
            orderDetail = info['orderDetail'].map( item => {
                return{
                    id: item['productToken'],
                    name: item['productName'],
                    quantity: item['itemNum'],
                    refundStatus: lang['zh-TW']['refundStatusEnum'][item['refundStatus']],
                    deliveryStatus: lang['zh-TW']['deliveryStatus'][item['deliveryStatus']],
                    spec: item['spec'],
                    total: item['amount']
                }
            })
        }
        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>基本資料</h4>
                    </article>
                    <form>
                        <ul className="table-row-list">
                            <li>
                                <label>訂單編號</label>
                                <div>{info['orderID'] || ""}</div>
                            </li>
                            <li>
                                <label>訂購時間</label>
                                <div>{dayjs(info['orderTimeMs'] || 0).format('YYYY/MM/DD')}</div>
                            </li>
                            <li>
                                <label>購買數量</label>
                                <div>{info['orderDetail']!=undefined? info['orderDetail'].length:0}</div>
                            </li>
                            <li>
                                <label>運送狀態</label>
                                <div>
                                    <div className="input-box select">
                                        <select name="status" onChange={this.handleChange.bind(this,'delivery_status')}>
                                            <option value="init">{ lang['zh-TW']['deliveryStatus']['init'] }</option>
                                            <option value="prepare">{ lang['zh-TW']['deliveryStatus']['prepare'] }</option>
                                            <option value="ontheway">{ lang['zh-TW']['deliveryStatus']['ontheway'] }</option>
                                            <option value="arrived">{ lang['zh-TW']['deliveryStatus']['arrived'] }</option>
                                        </select>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label>付款狀態</label>
                                <div>{lang['zh-TW']['orderStatus'][info['orderStatus']]}</div>
                            </li>
                        </ul>     
                    </form>
                </section>
                {/* <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>購買人資料</h4>
                    </article>
                    <ul className="table-row-list">
                        <li>
                            <label>訂購人：</label>
                            <div>零八九五七</div>
                        </li>
                        <li>
                            <label>聯絡電話：</label>
                            <div>02-27991234</div>
                        </li>
                        <li>
                            <label>手機號碼：</label>
                            <div>0912123123</div>
                        </li>
                        <li>
                            <label>信箱：</label>
                            <div>test@test.com</div>
                        </li>
                        <li>
                            <label>聯絡地址：</label>
                            <div>11419 台北市內湖區成功路100號100樓之1</div>
                        </li>
                    </ul>
                </section> */}
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>收件資料</h4>
                    </article>
                    <ul className="table-row-list">
                        <li>
                            <label>收件人</label>
                            <div>{info['deliveryName']||""}</div>
                        </li>
                        <li>
                            <label>聯絡電話</label>
                            <div>{info['deliveryPhone']||""}</div>
                        </li>
                        <li>
                            <label>聯絡地址</label>
                            <div>{`${info['deliveryZipCode'] || ""} ${info['deliveryCity'] || ""}${info['deliveryDist'] || ""}${info['deliveryAddress'] || ""}`}</div>
                        </li>
                    </ul>
                </section>
                {/* <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>發票</h4>
                    </article>
                    <ul className="table-row-list">
                        <li>
                            <label>訂購人：</label>
                            <div>蔡依林</div>
                        </li>
                        <li>
                            <label>聯絡電話：</label>
                            <div>02-27991234</div>
                        </li>
                        <li>
                            <label>手機號碼：</label>
                            <div>0912123123</div>
                        </li>
                    </ul>
                </section> */}
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>商品清單</h4>
                    </article>
                    {
                        info['orderDetail']!=undefined &&
                            <Table 
                                tableHeadData={tableHeadKey}
                                tableBodyData={orderDetail}
                            />
                    }
                </section>
            </React.Fragment>
        );
    }

    componentDidMount() {

        const { location, match } = this.props;
        const { pathname, search } = location;
        const orderID = match['params']['id'];
        this.props.dispatch( orderInfo(pathname,{...queryString.parse(search), orderID }) ).then( res => {
            switch( res['status'] ){
                case 200:
                    this.setState({
                        info: res['data']
                    })
                    break;

                default:
                    break;
            }
        });
    }

    handleChange = ( key,e ) => {

    }
}

const mapStateToProps = state => {
    return{
        info: state.myvendor.orderInfo
    }
}

export default connect( mapStateToProps )( Info );