/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                              from 'react';
import toaster                            from 'toasted-notes';
import CurrencyFormat                     from 'react-currency-format';
import { connect }                        from 'react-redux';

// Modules
import Confirm                            from '../../../../../../module/confirm';

// Actions
import { vinfo }                          from '../../../../../../actions/myvendor';

// Javascripts
import { checkRequired }                  from '../../../../../../public/javascripts/checkFormat';

// Json
import county_area                        from '../../../../../../public/json/TWzipcode.json';
import lang                               from '../../../../../../public/lang/lang.json';



class Basic extends React.Component{

    constructor(props){
        super(props);
        const city            = Object.keys(county_area)[0];
        const district        = Object.keys(county_area[city])[0];
        this.state            = {
            open                : false,
            popupMsg            : "",
            data                : props.data,
            formObject          : {
                company           : props.data['company'],
                email             : props.data['email'],
                phone             : props.data['phone']           || "",
                invoice           : props.data['invoice']         || "",
                contactor         : props.data['contactor']       || "",
                zipcode           : props.data['zipcode']         || "",
                city              : props.data['city']     ==""? city     : props.data['city'] || "",
                district          : props.data['district'] ==""? district : props.data['district'],
                address           : props.data['address']         || "",
                bankName          : props.data['bankName']        || "",
                bankCode          : props.data['bankCode']        || "",
                bankBranchName    : props.data['bankBranchName']  || "",
                bankAccountName   : props.data['bankAccountName'] || "",
                bankAccount       : props.data['bankAccount']     || "",
            },
            required: ['email','phone','contactor','bankName','bankCode','bankBranchName','bankAccountName','bankAccount'],
            msg:[]
        }
    }

    static getDerivedStateFromProps( props, state){
        if( Object.keys( state.data ).length==0 ){
            return{
                data: props.data,
                formObject: { ...props.data }
            }
        }
        return null;
    }

    render(){

        const {
            open,
            popupMsg,
            formObject
            , msg 
        } = this.state;

        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="admin-form-title">
                    <h3>一般</h3>
                </div>
                <ul className="table-row-list">
                    <li>
                        <label>公司名稱</label>
                        <div className="">
                            <div className="input-box">
                                <input type="text" name="company" value={formObject['company']} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>統一編號</label>
                        <div className="">
                            <div className="input-box">
                                <CurrencyFormat value={formObject['invoice']} format="########" onValueChange={ value => this.returnInvoice(value['value'],'invoice')}/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>＊聯絡人</label>
                        <div className="">
                            <div className="input-box">
                                <input type="text" name="contactor" value={formObject['contactor']} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>＊聯絡電話</label>
                        <div className="">
                            <div className="input-box">
                                <CurrencyFormat value={formObject['phone']} format="##########" onValueChange={ value => this.returnTel(value['value'],'phone')}/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>＊聯絡信箱</label>
                        <div className="">
                            <div className="input-box">
                                <input type="email" name="email" value={formObject['email']} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>                        
                    <li>
                        <label>公司地址</label>
                        <div className="">
                            <div className="input-box select">
                                <select name="city" value={formObject['city'] || ""} onChange={ this.handleChange.bind(this) }>
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
                                <select name="district" value={formObject['district'] || ""} onChange={ this.handleChange.bind(this) }>
                                    <option value="">請選擇鄉鎮市區</option>
                                    {
                                        formObject['city']!=undefined && formObject['city']!=""? (
                                            Object.keys(county_area[formObject['city']]).map( (item,i) => {
                                                return(
                                                    <option key={`district_${i}`} value={item} data-zipcode={county_area[formObject['city']][item]} >{item}</option>
                                                )
                                            })
                                        ):(
                                            null
                                        )
                                    }
                                </select>
                            </div>
                            <div className="input-box">
                                <input type="text" name="address" value={ formObject['address'] || "" } onChange={ this.handleChange.bind(this) } placeholder=""/>
                            </div>
                        </div>
                    </li>
                </ul>
                
                <div className="admin-form-title">
                    <h3>匯 / 收款銀行資料</h3>
                </div>
                <ul className="table-row-list">
                    <li>
                        <label>＊銀行名稱</label>
                        <div className="">
                            <div className="input-box">
                                <input type="text" name="bankName" value={formObject['bankName'] || ""} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>＊銀行代號</label>
                        <div className="">
                            <div className="input-box">
                                <CurrencyFormat value={formObject['bankCode'] || ""} format="###" onValueChange={ value => this.returnTel(value['value'],'bankCode')}/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>＊分行</label>
                        <div className="">
                            <div className="input-box">
                                <input type="text" name="bankBranchName" value={formObject['bankBranchName'] || ""} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>＊帳號名稱</label>
                        <div className="">
                            <div className="input-box">
                                <input type="text" name="bankAccountName" value={formObject['bankAccountName'] || ""} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>＊帳號</label>
                        <div className="">
                            <div className="input-box">
                                <input type="text" name="bankAccount" value={formObject['bankAccount'] || ""} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="form-msg">
                    {
                        msg.length!=0 &&
                            msg
                    }
                </div>
                <ul className="action-ul">
                    <li><button type="button" className="cancel" onClick={this.props.returnCancel.bind(this)}>取消</button></li>
                    <li><button className="basic">更新</button></li>
                </ul>

                <Confirm 
                    open        ={open}
                    container   ={popupMsg}
                    onCancel    ={this.handleCancel.bind(this)}
                    onConfirm   ={this.handleConfirm.bind(this)}
                />
            </form>
        );
    }

    handleChange = (e) => {

        const name = e.target.name;
        const val = e.target.value;
        let { formObject } = this.state;

        switch( name ){
            case 'area_code':
                formObject = { 
                    ...formObject,
                    [name]: val,
                    phone: "" 
                };
                break;
            
            case 'city':
                const districtArr    = county_area[val];
                const district       = Object.keys(districtArr)[0];
                const zipcode        = districtArr[district];
                formObject           = { 
                    ...formObject,
                    [name]             : val,
                    zipcode            : zipcode,
                    district           : district
                };
                break;
            
            case 'district':
                formObject           = { 
                    ...formObject,
                    [name]             : val,
                    zipcode            : e.target.options[e.target.selectedIndex].dataset.zipcode 
                };
                break;

            default:
                formObject = { 
                    ...formObject, 
                    [name]: val 
                };
                break;
        }

        this.setState({
            formObject
        })
    }

    returnInvoice = ( val,name ) => {
        let { formObject } = this.state;
        formObject = { ...formObject, [name]: val };
        this.setState({
            formObject
        })
    }

    returnTel = ( val,name ) => {
        let { formObject } = this.state;
        formObject = { ...formObject, [name]: val };
        this.setState({
            formObject
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            open: true,
            popupMsg: lang['zh-TW']['Are you sure you want to modify it']
        })
    }

    handleCancel = () => {
        this.setState({
            open: false,
            popupMsg: ""
        })
    }

    handleConfirm = () => {

        const { data } = this.props;
        const { formObject,required } = this.state;
        const checkRequiredFilter     = checkRequired( required,formObject );

        if( checkRequiredFilter.length==0 ){
            this.props.dispatch( vinfo('put',{},formObject,data) ).then( res => {

                const { status, data } = res;

                switch( status ){
                    case 200:
                        this.props.returnSuccess( formObject );
                        toaster.notify(
                            <div className={`toaster-status success`}>變更成功</div>
                        ,{
                            position: 'bottom-right',
                            duration: 3000
                        });
                        break;

                    default:
                        this.setState({
                            msg: [<div key="note">{lang['zh-TW']['note'][data['status_text']]}</div>]
                        },()=>{
                            this.handleCancel();
                        })
                        break;
                }
            });
        }else{
            this.setState({
                msg: checkRequiredFilter
            },()=>{
                this.handleCancel();
            })
        }
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )( Basic );