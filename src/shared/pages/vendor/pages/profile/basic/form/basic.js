import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';

// Components
import Confirm from '../../../../../../module/confirm';

// Actions
import { vinfo } from '../../../../../../actions/vendor';

// Json
import area_code from '../../../../../../public/json/TWareacode.json';
import county_area from '../../../../../../public/json/TWzipcode.json';
import lang from '../../../../../../lang/lang.json';

class Basic extends React.Component{

    constructor(props){
        const city = Object.keys(county_area)[0];
        const district = Object.keys(county_area[city])[0];
        super(props);
        this.state = {
            open: false,
            popupMsg: "",
            formObject: {
                company : props.data['company'],
                email: props.data['email'],
                //area_code: area_code['0']['code'],
                phone: props.data['phone'],
                invoice: props.data['invoice'],
                contactor: props.data['contactor'],
                zipcode: props.data['zipcode'],
                city: props.data['city']==""? city : props.data['city'],
                district: props.data['district']==""? district : props.data['district'],
                address: props.data['address'],
                bankName: props.data['bankName'],
                bankCode: props.data['bankCode'],
                bankBranch: props.data['bankBranch'],
                bankAccount: props.data['bankAccount'],

            },
            required: ['email','phone','contactor'],
            msg:[]
        }
    }

    render(){

        const {
            open,
            popupMsg,
            formObject
            , msg 
        } = this.state;
        const areaCode = formObject['area_code'];
        let areaCodeFormat = "";
        area_code.map( item => {
            if( item['code']==areaCode ){
                areaCodeFormat = item['format'];
            }
        });

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
                            {/* <div className="input-box select">
                                <select name="area_code" onChange={ this.handleChange.bind(this) }>
                                    {
                                        area_code.map( (item,i) => {
                                            return(
                                                <option key={item['code']} value={item['code']}>{item['code']}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div> 
                            <div className="input-box">
                                <CurrencyFormat value={formObject['phone']} format={areaCodeFormat} mask="_" onValueChange={ value => this.returnTel(value['value'],'phone')}/>
                            </div>*/}
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
                                <select name="city" value={formObject['city']} onChange={ this.handleChange.bind(this) }>
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
                                <select name="district" value={formObject['district']} onChange={ this.handleChange.bind(this) }>
                                    {
                                        Object.keys(county_area[formObject['city']]).map( (item) => {
                                            return(
                                                <option key={`${item}`} value={item} data-zipcode={county_area[formObject['city']][item]} >{item}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="input-box">
                                <input type="text" name="address" value={ formObject['address'] } onChange={ this.handleChange.bind(this) } placeholder=""/>
                            </div>
                        </div>
                    </li>
                </ul>
                
                <div className="admin-form-title">
                    <h3>匯 / 收款銀行資料</h3>
                </div>
                <ul className="table-row-list">
                    <li>
                        <label>銀行名稱</label>
                        <div className="">
                            <div className="input-box">
                                <input type="text" name="bankName" value={formObject['bankName']} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>銀行代號</label>
                        <div className="">
                            <div className="input-box">
                                <input type="text" name="bankCode" value={formObject['bankCode']} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>分行</label>
                        <div className="">
                            <div className="input-box">
                                <input type="text" name="bankBranch" value={formObject['bankBranch']} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>帳號</label>
                        <div className="">
                            <div className="input-box">
                                <input type="text" name="bankAccount" value={formObject['bankAccount']} onChange={this.handleChange.bind(this)} />
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
                    open={open}
                    container={popupMsg}
                    onCancel={this.handleCancel.bind(this)}
                    onConfirm={this.handleConfirm.bind(this)}
                />
            </form>
        );
    }

    handleChange = (e) => {
        let { formObject } = this.state;
        const name = e.target.name;
        const val = e.target.value;
        formObject = { ...formObject, [name]: val };
        if( name=='area_code' ){
            formObject = { ...formObject, phone: "" };
        }
        if( name=='district' ){
            formObject = { ...formObject, zipcode: e.target.options[e.target.selectedIndex].dataset.zipcode };
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
            popupMsg: "asdasdasdasdasd"
        })
    }

    handleCancel = () => {
        this.setState({
            open: false,
            popupMsg: ""
        })
    }

    handleConfirm = () => {
        const { formObject,required } = this.state;
        const requiredFilter = required.filter( filterItem => {
            return formObject[filterItem]=='';
        })
        if( requiredFilter.length ){
            // 未填寫完整
            const noteMSG = requiredFilter.map( (item,i) => {
                return <div key={item}>{lang['zh-TW']['note'][`${item} required`] }</div>;
            })
            this.setState({
                msg: noteMSG
            })
        }else{
            // 填寫完整
            const result = {
                company: formObject['company'],
                email: formObject['email'],
                phone: formObject['phone'],
                invoice: formObject['invoice'],
                contactor: formObject['contactor'],
                zipcode: formObject['zipcode'],
                city: formObject['city'],
                cityarea: formObject['district'],
                address: formObject['address'],
                bankName: formObject['bankName'],
                bankCode: formObject['bankCode'],
                bankBranch: formObject['bankBranch'],
                bankAccountNo: formObject['bankAccount']
            }
            
            
            this.props.dispatch( vinfo('put',result) ).then( res => {
                if( res['status']==200 ){
                    this.props.returnCancel()
                }
            });
        }
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )( Basic );