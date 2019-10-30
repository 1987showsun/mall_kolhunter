// 訂單-退貨
import React                     from 'react';
import dayjs                     from 'dayjs';
import { Link }                  from 'react-router-dom';
import { connect }               from 'react-redux';
import { FontAwesomeIcon }       from '@fortawesome/react-fontawesome';
import { faChevronCircleRight}   from '@fortawesome/free-solid-svg-icons';

// Modules
import Table                     from '../../../../../../module/table';
import Confirm                   from '../../../../../../module/confirm';

// Actions
import { ordersInfo }            from '../../../../../../actions/myaccount';

// Set
import tableHeadData             from './public/set/tableHeadData';

// Lang
import lang                      from '../../../../../../public/lang/lang.json';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            open: false,
            pupopMSG: "",
            method: 'confirm',
            selected: [],
            info: {},
            tableHeadData : tableHeadData,
            tableBodyData : []
        }
    }

    render(){

        const { loading, open, method, pupopMSG, selected, info,  tableHeadData, tableBodyData } = this.state;

        return(
            <React.Fragment>
                <section className="container-unit">
                    <div className="unit-head">
                        <h3>訂單資訊</h3>
                    </div>
                    <ul className="card-form-list">
                        <li>
                            <label>訂單編號</label>
                            <div>{info['orderID']}</div>
                        </li>
                        <li>
                            <label>訂購狀態</label>
                            <div>{lang['zh-TW']['orderStatus'][info['orderStatus']]}</div>
                        </li>
                        <li>
                            <label>訂購數量</label>
                            <div>{tableBodyData.length}</div>
                        </li>
                        <li>
                            <label>訂購日期</label>
                            <div>{dayjs(this.state.createTimeMs).format("YYYY / MM / DD")}</div>
                        </li>
                    </ul>
                </section>

                <section className="container-unit">
                    <div className="unit-head">
                        <h3>訂購人 / 收件人資訊</h3>
                    </div>
                    <div className="container-unit-row" data-flexwrap="wrap">
                        <div className="container-unit-row" data-flexwrap="wrap">
                            <div className="container-unit-head">
                                <h4><FontAwesomeIcon icon={faChevronCircleRight}/>訂購人</h4>
                            </div>
                            <ul className="card-form-list">
                                <li>
                                    <label htmlFor="name2">姓名</label>
                                    <div>{info['orderName']}</div>
                                </li>
                                <li>
                                    <label htmlFor="name2">電話</label>
                                    <div>{info['orderPhone']}</div>
                                </li>
                                <li>
                                    <label htmlFor="name2">信箱</label>
                                    <div>{info['orderEmail']}</div>
                                </li>
                            </ul>
                        </div>
                        <div className="container-unit-row" data-flexwrap="wrap">
                            <div className="container-unit-head">
                                <h4><FontAwesomeIcon icon={faChevronCircleRight}/>收件人</h4>
                            </div>
                            <ul className="card-form-list">
                                <li>
                                    <label htmlFor="name2">姓名</label>
                                    <div>{info['deliveryName']}</div>
                                </li>
                                <li>
                                    <label htmlFor="name2">電話</label>
                                    <div>{info['deliveryPhone']}</div>
                                </li>
                                <li>
                                    <label htmlFor="name2">信箱</label>
                                    <div>{info['deliveryEmail']}</div>
                                </li>
                                <li>
                                    <label htmlFor="name2">地址</label>
                                    <div>{`${info['deliveryZipCode']} ${info['deliveryCity']}${info['deliveryDist']}${info['deliveryAddress']}`}</div>
                                </li>
                            </ul>
                        </div> 
                    </div>
                </section>

                <section className="container-unit">
                    <div className="unit-head">
                        <h3>該筆訂單商品</h3>
                    </div>
                    <Table
                        className="member-order-info-table"
                        tableHeadData= {tableHeadData}
                        tableBodyData= {tableBodyData}
                        returnCheckbox= { (val) => {this.setState({ selected: val })} }
                    />
                </section>

                <section className="container-unit">
                    <div className="container-unit-action">
                        <ul>
                            <li><button onClick={this.action.bind(this,'cancel')} className="cancel">返回上頁</button></li>
                            {
                                info['refundAble'] &&
                                    <li><button onClick={this.action.bind(this,'submit')} className="mall-yes">前往退貨</button></li>
                            }
                        </ul>
                    </div>
                </section>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, match } = this.props;
        const { pathname, search } = location;
        const orderID = match['params']['id'] || "";
        this.props.dispatch( ordersInfo(pathname,{orderID: orderID}) ).then( res => {

            this.setState({
                info: res,
                tableBodyData: res['orderDetail'].map( item => {
                    return{
                        id: item['productToken'],
                        cover: item['image'],
                        name: [<Link key={`name_${item['id']}`} to={`/detail/${item['productToken']}`} target="_blank">{item['productName']}</Link>],
                        count: item['count'],
                        storeName: item['storeToken']!=""? [<Link key={'123'} to={`/store/${item['storeToken']}`} target="_blank">{item['storeName']}</Link>] : 'Kolhunter',
                        refundStatusEnum: lang['zh-TW']['refundStatusEnum'][item['refundStatus']],
                        refundStatus: item['refundStatus'],
                        total: item['amount']
                    }
                })
            })
        });
    }
    
    action = ( method ) => {
        const { match, history } = this.props;
        const id = match['params']['id'];
        switch( method ){
            case 'submit':
                history.push({
                    pathname: `/myaccount/orders/return/${id}`
                })
                break;
            default:
                history.goBack();
                break;
        }
    }

    onCancel = () => {
        this.setState({
            open: false,
            method: 'confirm',
            header: '',
            pupopMSG: ''
        })
    }

    handleConfirm = () => {

        if( this.state.method=='alert' ){
            this.onCancel();
        }else{
            this.setState({
                method: 'alert',
                pupopMSG: '已送出退貨請求'
            })            
        }

    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );