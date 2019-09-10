// 訂單-退貨
import React from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faChevronCircleRight}from '@fortawesome/free-solid-svg-icons';

// Modules
import Table from '../../../../../module/table';
import Confirm from '../../../../../module/confirm';

// Actions
import { ordersInfo } from '../../../../../actions/myaccount';

// Set
import tableHeadData from './public/set/tableHeadData';

// Lang
import lang from '../../../../../public/lang/lang.json';

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
                        tableHeadData= {tableHeadData}
                        tableBodyData= {tableBodyData}
                        returnCheckbox= { (val) => {this.setState({ selected: val })} }
                    />
                </section>

                <section className="container-unit">
                    <div className="container-unit-action">
                        <ul>
                            <li><button onClick={this.action.bind(this,'cancel')} className="cancel">返回上頁</button></li>
                            <li><button onClick={this.action.bind(this,'submit')} className="mall-yes">確定退貨</button></li>
                        </ul>
                    </div>
                </section>

                <Confirm 
                    open={open}
                    method= {method}
                    header= {`您確定要退貨以下商品嗎？`}
                    container={pupopMSG}
                    onCancel={this.onCancel.bind(this)}
                    onConfirm={this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, match } = this.props;
        const { pathname, search } = location;
        const orderID = match['params']['id'] || "";
        this.props.dispatch( ordersInfo(pathname,{orderID: orderID}) ).then( res => {

            const tableBodyData = res['orderDetail'].map( item => {
                return{
                    id: item['productToken'],
                    cover: item['image'],
                    name: item['productName'],
                    count: item['count'],
                    total: item['amount']
                }
            })

            this.setState({
                info: res,
                tableBodyData
            })
        });
    }
    
    action = ( method ) => {
        switch( method ){
            case 'submit':
                const { selected } = this.state;
                if( selected.length!=0 ){
                    let pupopMSG = "";
                    selected.map( (item,i) => {
                        pupopMSG = `${pupopMSG}<div class="items">${i+1}. ${item['name']}</div>`
                    })
                    this.setState({
                        open: true,
                        pupopMSG
                    })
                }
                break;
            default:
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