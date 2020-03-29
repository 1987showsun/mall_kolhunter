/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

// 訂單-退貨
import React                        from 'react';
import toaster                      from 'toasted-notes';
import CurrencyFormat               from 'react-currency-format';
import queryString                  from 'query-string';
import { connect }                  from 'react-redux';

// Components
import Items                        from './components/items';

// Modules
import Table                        from '../../../../../../module/table-new';
import Confirm                      from '../../../../../../module/confirm';
import Loading                      from '../../../../../../module/loading/mallLoading';

// Actions
import { ordersInfo, ordersRefund, bankInfoUpdate } from '../../../../../../actions/myaccount';

// Javascripts
import { checkRequired }         from '../../../../../../public/javascripts/checkFormat';

import area_code                 from '../../../../../../public/json/TWareacode.json';
import county_area               from '../../../../../../public/json/TWzipcode.json';

// Lang
import lang                         from '../../../../../../public/lang/lang.json';

// Styelsheets
import './public/stylesheets/style.scss';

const city    = Object.keys(county_area)[0];
const dist    = Object.keys(county_area[city])[0];
const zipCode = county_area[city][dist];

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading       : false,
            open          : false,
            method        : 'confirm',
            header        : "",
            pupopMSG      : "",
            selected      : [],
            info          : {},
            list          : [],
            memberInfo    : {},
            required: ['bankName','bankCode', 'bankBranch', 'bankAccountName', 'bankAccount'],
            formObject: {
                zipCode    : zipCode,
                city       : city,
                dist       : dist,
                address    : '',
                bankname   : '',
                bankCode   : '',
                bankBranch : '',
                bankAccountName   : ''
            },
            payMethod: 'cc',
            msg: []
        }
    }

    render(){
        const { loading, open, selected, method, header, pupopMSG, list, formObject, payMethod, msg } = this.state;
        return(
            <React.Fragment>
                <section className="container-unit">
                    <div className="unit-head">
                        <h3>該筆訂單商品</h3>
                    </div>
                    <section className="container-unit-row">
                        <Table>
                            {
                                list.map((item,i) => {
                                    return(
                                        <Items 
                                            {...item}
                                            key          = {i} 
                                            selected     = {selected}
                                            handleChange = {this.handleChange.bind(this)}
                                        />
                                    )
                                })
                            }
                        </Table>
                        <Loading loading={loading}/>
                    </section>
                    <section className="container-unit">
                        <form>
                            <div className="unit-head">
                                <h3>取貨地址</h3>
                            </div>
                            <ul className="table-row-list">
                                <li>
                                    <div>
                                        <div className="input-box select">
                                            <select name="city" value={formObject['city'] || ""} onChange={ this.handleFormChange.bind(this) }>
                                                <option value="">請選擇縣市</option>
                                                {
                                                    Object.keys(county_area).map( item => {
                                                        return(
                                                            <option key={`city_${item}`} value={item} >{item}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="input-box select">
                                            <select name="dist" value={formObject['dist'] || ""} onChange={ this.handleFormChange.bind(this) }>
                                                <option value="">請選擇鄉鎮市區</option>
                                                {
                                                    formObject['city']!=undefined && formObject['city']!=""? (
                                                        Object.keys(county_area[formObject['city']]).map( (item) => {
                                                            return(
                                                                <option key={`${item}`} value={item} data-zipcode={county_area[formObject['city']][item]} >{item}</option>
                                                            )
                                                        })
                                                    ):(
                                                        null
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="input-box">
                                            <input type="text" name="address" defaultValue={ formObject['address'] || '' } onChange={ this.handleFormChange.bind(this) } placeholder=""/>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            {
                                payMethod!='cc' ? (
                                    <>
                                    <div className="unit-head">
                                        <h3>帳戶資料</h3>
                                    </div>
                                    <ul className="table-row-list">
                                        <li>
                                            <label>＊帳戶名稱</label>
                                            <div className="input-box">
                                                <input type="text" name="bankAccountName" value={formObject['bankAccountName'] || ''} onChange={this.handleFormChange.bind(this)} />
                                            </div>
                                        </li>
                                        <li>
                                            <label>＊銀行名稱</label>
                                            <div className="input-box">
                                                <input type="text" name="bankName" value={formObject['bankName'] || ''} onChange={this.handleFormChange.bind(this)} />
                                            </div>
                                        </li>
                                        <li>
                                            <label>＊銀行代號</label>
                                            <div className="input-box">
                                                <CurrencyFormat value={formObject['bankCode'] || ''}  format="#####" onValueChange={(values) => {
                                                    this.setState({
                                                        formObject: {
                                                            ...this.state.formObject,
                                                            "bankCode": values['value']
                                                        }
                                                    })
                                                }}/>
                                            </div>
                                        </li>
                                        <li>
                                            <label>＊分行名稱</label>
                                            <div className="input-box">
                                                <input type="text" name="bankBranch" value={formObject['bankBranch'] || ''} onChange={this.handleFormChange.bind(this)} />
                                            </div>
                                        </li>
                                        <li>
                                            <label>＊帳號</label>
                                            <div className="input-box">
                                                <CurrencyFormat value={formObject['bankAccount'] || ''} onValueChange={(values) => {
                                                    this.setState({
                                                        formObject: {
                                                            ...this.state.formObject,
                                                            "bankAccount": values['value']
                                                        }
                                                    })
                                                }}/>
                                            </div>
                                        </li>
                                    </ul>
                                    </>
                                ):(
                                    null
                                )
                            }
                            {
                                msg.length!=0 &&
                                    <div className="form-msg">{ msg }</div>
                            }
                        </form>
                    </section>
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
                    open          = {open}
                    method        = {method}
                    header        = {header}
                    container     = {pupopMSG}
                    onCancel      = {this.onCancel.bind(this)}
                    onConfirm     = {this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const { location, match } = this.props;
        const { pathname }        = location;
        const orderID             = match['params']['id'] || "";

        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( ordersInfo(pathname,{orderID: orderID}) ).then( res => {
                this.setState({
                    loading: false
                },()=>{
                    const { status, data } = res;
                    switch( status ){
                        case 200:
                            const { orderDetail, deliveryZipCode, deliveryCity, deliveryDist, deliveryAddress, payMethod } = data;
                            let formObject = { ...this.state.formObject };
                            const { memberInfo } = this.props;
                            formObject = {
                                ...this.state.formObject,
                                zipCode    : deliveryZipCode,
                                city       : deliveryCity,
                                dist       : deliveryDist,
                                address    : deliveryAddress,
                                bankName   : memberInfo['bankName']!=null ? memberInfo['bankName'] : '',
                                bankCode   : memberInfo['bankCode']!=null ? memberInfo['bankCode'] : '',
                                bankBranch : memberInfo['bankBranch']!=null ? memberInfo['bankBranch'] : '',
                                bankAccountName: memberInfo['bankAccountName']!=null ? memberInfo['bankAccountName'] : '',
                                bankAccount: memberInfo['bankAccount']!=null ? memberInfo['bankAccount'] : ''
                            };
                            this.setState({
                                list: orderDetail.filter( item => item['refundStatus']=='none'),
                                formObject: formObject,
                                payMethod: payMethod
                            })
                            break;

                        default:
                            break;
                    }
                })

            });
        });
    }

    handleChange = ( val ) => {
        const { itemCode }  = val;
        const { selected }  = this.state;
        const someItem      = selected.includes(itemCode);
        this.setState({
            selected: !someItem? ([
                ...selected,
                itemCode
            ]) : selected.filter( item => item!=itemCode )
        })
    }

    handleFormChange = (e) => {
        const { name, value } = e.target;
        let formObject = { ...this.state.formObject };
        let city       = '';
        let dist       = '';
        let zipCode    = '';

        switch( name ){
            case 'city':
                dist    = Object.keys(county_area[value])[0];
                zipCode = county_area[value][dist];
                formObject = { ...formObject, [name]: value, dist: dist, zipCode: zipCode };
                break;

            case 'dist':
                city    = formObject['city'];
                zipCode = county_area[city][value];
                formObject = { ...formObject, [name]: value, zipCode: zipCode };
                break;
            case 'address':
                formObject = { ...formObject, 'address': value };
                break;
            default:
                formObject = { ...formObject, [name]: value };
                break;
        }
        this.setState({
            formObject
        })
    }
    
    action = ( method ) => {
        const { history } = this.props;
        const { list }    = this.state;
        switch( method ){
            case 'submit':
                const { selected } = this.state;
                if( selected.length!=0 ){
                    this.setState({
                        open         : true,
                        method       : 'confirm',
                        header       : "您確定要退貨以下商品嗎？",
                        pupopMSG     : selected.map( (items,i) => {
                            return(
                                <div key={i} className="items">
                                    {i+1}. {list.filter(item => item['itemCode']==items )[0]['productName']}
                                </div>
                            );
                        })
                    })
                }else{
                    this.setState({
                        open         : true,
                        method       : 'alert',
                        header       : "",
                        pupopMSG     : '請選擇一個以上要退貨之商品'
                    });
                }
                break;

            default:
                history.goBack();
                break;
        }
    }

    onCancel = () => {
        this.setState({
            open         : false,
            method       : 'confirm',
            header       : '',
            pupopMSG     : []
        })
    }

    handleConfirm = () => {

        const { selected, method, formObject, list, required, payMethod }         = this.state;
        const { location, history, match } = this.props;
        const { pathname, search }         = location;
        const checkRequiredFilter = checkRequired( required,formObject );
        if (checkRequiredFilter.length == 0 || payMethod=='cc'){
            if( method=='alert' ){
                this.onCancel();
            }else{

                const bankData = {
                    bankName: formObject['bankName'],
                    bankCode: formObject['bankCode'],
                    bankBranch: formObject['bankBranch'],
                    bankAccountName: formObject['bankAccountName'],
                    bankAccount: formObject['bankAccount']
                }

                this.props.dispatch( bankInfoUpdate(pathname,{...queryString.parse(search)},bankData) ).then( res => {

                    let   status      = 'failure';
                    let   status_text = lang['zh-TW']['toaster']['refundFailure'];

                    switch( res['status'] ){
                        case 200:
                            let orderID = match['params']['id']
                            const refundData = {
                                orderID   : orderID,
                                itemCode  : selected,
                                refundZipCode: formObject['zipCode'],
                                refundCity: formObject['city'],
                                refundDist: formObject['dist'],
                                refundAddress: formObject['address']
                            }

                            this.props.dispatch( ordersRefund(pathname,{...queryString.parse(search)},refundData) ).then( res => {

                                let   status      = 'failure';
                                let   status_text = lang['zh-TW']['toaster']['refundFailure'];
    
                                switch( res['status'] ){
                                    case 200:
                                        status      = 'success';
                                        status_text = lang['zh-TW']['toaster']['refundSuccess'];

                                        let refundAmount = 0;
                                        let gaItems = [];
                                        selected.map((itemCode)=>{
                                            let selectedItem = list.filter(item => item['itemCode']==itemCode )[0]
                                            gaItems.push({
                                                "id": selectedItem['productToken'],
                                                "name": selectedItem['productName'],
                                                "quantity": selectedItem['count'],
                                                "price": selectedItem['price']
                                            })
                                            refundAmount = refundAmount + selectedItem['amount'];
                                        })
                                        
                                        gtag('event', 'refund', {
                                            "transaction_id": orderID,
                                            "value": refundAmount, // total refund amount,
                                            "currency": "TWD",
                                            "shipping": 0,
                                            "items": gaItems
                                        });

                                        history.goBack();
                                        break;

                                    default:
                                        status      = 'failure';
                                        status_text = lang['zh-TW']['toaster']['refundFailure'];
                                        break;
                                }

                                this.onCancel();
                                // 提示視窗
                                toaster.notify( <div className={`toaster-status ${status}`}>{status_text}</div> ,{
                                    position: 'bottom-right',
                                    duration: 3000
                                })
                            });
                            break;

                        default:
                            status      = 'failure';
                            status_text = lang['zh-TW']['toaster']['refundFailure'];
                            break;
                    }
                });
            }
        } else {
            this.onCancel();
            this.setState({
                msg: checkRequiredFilter
            })
        }
    }
}

const mapStateToProps = state => {
    const { myaccount:{ info }} = state;
    return{
        memberInfo: info
    }
}

export default connect( mapStateToProps )( Index );