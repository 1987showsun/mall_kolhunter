import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';

// Json
import area_code from '../../../../../public/json/TWareacode.json';
import county_area from '../../../../../public/json/TWzipcode.json';

export default class PurchaseInfo extends React.Component{

    constructor(props){

        const initCounty = Object.keys(county_area)[0];
        const initCountyArea = Object.keys(county_area[initCounty])[0];

        super(props);
        this.state = {
            formObject:{
                name: "",
                department: "",
                email: "",
                area_code: area_code['0']['code'],
                tel_number: "",
                county: initCounty,
                county_area: initCountyArea,
                address: ""
            }
        }
    }

    render(){

        const { formObject } = this.state;
        const areaCode = formObject['area_code'];
        let areaCodeFormat = "";
        area_code.map( item => {
            if( item['code']==areaCode ){
                areaCodeFormat = item['format'];
            }
        });

        return(
            <React.Fragment>
                <ul className="program-form-ul">
                    <li>
                        <label>* 承辦人 / 公司</label>
                        <div className="input-box">
                            <input type="text" name="name" value={ formObject['name'] } onChange={ this.handleChange.bind(this) } placeholder=""/>
                        </div>
                    </li>
                    <li>
                        <label>* 部門 / 職稱</label>
                        <div className="input-box">
                            <input type="text" name="department" value={ formObject['department'] } onChange={ this.handleChange.bind(this) } placeholder=""/>
                        </div>
                    </li>
                    <li>
                        <label>* 連絡信箱</label>
                        <div className="input-box">
                            <input type="email" name="email" value={ formObject['email'] } onChange={ this.handleChange.bind(this) } placeholder=""/>
                        </div>
                    </li>
                    <li>
                        <label>* 聯絡電話</label>
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
                            <CurrencyFormat value={formObject['tel']} format={areaCodeFormat} mask="_" onValueChange={ value => this.returnTel(value['formattedValue'],'tel_number')}/>
                        </div>
                    </li>
                    <li>
                        <label>* 聯絡地址</label>
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
                    </li>
                </ul>
            </React.Fragment>
        );
    }

    handleChange = ( e ) => {
        let { formObject } = this.state;
        const name = e.target.name;
        const val = e.target.value;
        formObject = { ...formObject, [name]: val };
        if( name=='area_code' ){
            formObject = { ...formObject, tel: "" };
        }
        this.setState({
            formObject
        },()=>{
            this.returnHandleChange();
        })
    }

    returnTel = ( val,name ) => {
        let { formObject } = this.state;
        formObject = { ...formObject, [name]: val };
        this.setState({
            formObject
        },()=>{
            this.returnHandleChange();
        })
    }

    returnHandleChange = () => {
        let { formObject } = this.state;
        if( this.props.returnHandleChange ){
            this.props.returnHandleChange(formObject);
        }
    }
}