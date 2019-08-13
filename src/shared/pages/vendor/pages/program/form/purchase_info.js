import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';

// Json
import area_code from '../../../../../public/json/TWareacode.json';
import county_area from '../../../../../public/json/TWzipcode.json';

const city = Object.keys(county_area)[0];
const district = Object.keys(county_area[city])[0];

export default class PurchaseInfo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: props.data,
            formObject:{
                company: "",
                contactor: "",
                email: "",
                phone: "",
                zipcode: "",
                city: "",
                district: "",
                address: ""
            }
        }
    }

    static getDerivedStateFromProps( props,state ) {
        if( Object.keys(state.data).length==0 ){

            let formObject = { ...props.data };
            console.log( 'formObject',formObject );
            if( props.data['city']==undefined || props.data['city']=="" ){
                formObject = { ...formObject,city: city }
            }
            if( props.data['district']==undefined || props.data['district']=="" ){
                formObject = { ...formObject,district: district }
            }

            return{
                data: props.data,
                formObject
            }
        }
        return null;
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
                        <label>* 公司</label>
                        <div className="input-box">
                            <input type="text" name="company" value={ formObject['company'] || "" } onChange={ this.handleChange.bind(this) } placeholder=""/>
                        </div>
                    </li>
                    <li>
                        <label>* 聯絡人</label>
                        <div className="input-box">
                            <input type="text" name="contactor" value={ formObject['contactor'] || "" } onChange={ this.handleChange.bind(this) } placeholder=""/>
                        </div>
                    </li>
                    <li>
                        <label>* 信箱</label>
                        <div className="input-box">
                            <input type="email" name="email" value={ formObject['email'] || "" } onChange={ this.handleChange.bind(this) } placeholder=""/>
                        </div>
                    </li>
                    <li>
                        <label>* 聯絡電話</label>
                        <div className="input-box">
                            <CurrencyFormat value={ formObject['phone'] || "" } format="##########" onValueChange={ value => this.returnTel(value['formattedValue'],'phone')}/>
                        </div>
                    </li>
                    <li>
                        <label>* 聯絡地址</label>
                        <div className="input-box select">
                            <select name="city" onChange={ this.handleChange.bind(this) }>
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
                            {/* <select name="district" onChange={ this.handleChange.bind(this) }>
                                {
                                    Object.keys(county_area[formObject['city']]).map( item => {
                                        return(
                                            <option key={`${formObject['city']}_${item}`} value={item}>{item}</option>
                                        )
                                    })
                                }
                            </select> */}
                        </div>
                        <div className="input-box">
                            <input type="text" name="address" value={ formObject['address'] || "" } onChange={ this.handleChange.bind(this) } placeholder=""/>
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