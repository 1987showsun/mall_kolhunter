import React from 'react';
import CurrencyFormat from 'react-currency-format';

// Json
import area_code from '../../../../../../public/json/TWareacode.json';
import county_area from '../../../../../../public/json/TWzipcode.json';
import lang from '../../../../../../lang/lang.json';

export default class Basic extends React.Component{

    constructor(props){

        const initCounty = Object.keys(county_area)[0];
        const initCountyArea = Object.keys(county_area[initCounty])[0];

        super(props);
        this.state = {
            formObject: {
                company : "",
                email: "",
                area_code: area_code['0']['code'],
                phone: "",
                invoice: "",
                contactor: "",
                county: initCounty,
                county_area: initCountyArea,
                address: ""
            },
            required: ['company','email','phone','invoice','contactor'],
            msg:[]
        }
    }

    render(){

        const { formObject, msg } = this.state;
        const areaCode = formObject['area_code'];
        let areaCodeFormat = "";
        area_code.map( item => {
            if( item['code']==areaCode ){
                areaCodeFormat = item['format'];
            }
        });

        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <ul className="table-row-list">
                    <li>
                        <label>＊公司名稱</label>
                        <div className="">
                            <div className="input-box">
                                <input type="text" name="company" value={formObject['company']} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>＊統一編號</label>
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
                            <div className="input-box select">
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
                                <select name="county" onChange={ this.handleChange.bind(this) }>
                                    {
                                        Object.keys(county_area).map( item => {
                                            return(
                                                <option key={`county_${item}`} value={item}>{item}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="input-box select">
                                <select name="county_area" onChange={ this.handleChange.bind(this) }>
                                    {
                                        Object.keys(county_area[formObject['county']]).map( item => {
                                            return(
                                                <option key={`${formObject['county']}_${item}`} value={item}>{item}</option>
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
                phone: `${formObject['area_code']}-${formObject['phone']}`,
                invoice: formObject['invoice'],
                contactor: formObject['contactor'],
                address: `${formObject['county']}${formObject['county_area']}${formObject['address']}`
            }
            console.log( result );
        }
    }
}