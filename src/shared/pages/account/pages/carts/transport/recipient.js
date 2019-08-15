import React from 'react';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

// Json
import county_area from '../../../../../public/json/TWzipcode.json';

// Lang
import lang from '../../../../../lang/lang.json';

const city = Object.keys(county_area)[0];
const district = Object.keys(county_area[city])[0];

export default class Recipient extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                name: "",
                phone: "",
                email: "",
                zipcode: "",
                city: city || "",
                district: district || "",
                address: "",
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <ul className="card-form-list">
                <li>
                    <label htmlFor="name2">姓名</label>
                    <div className="input-box">
                        <input type="text" name="name" value={formObject['name']} id="name2" onChange={this.handleChange.bind(this)} />
                    </div>
                </li>
                <li>
                    <label htmlFor="phone2">手機號碼</label>
                    <div className="input-box">
                        <CurrencyFormat id="phone2" value={formObject['phone']} format="####-######" onValueChange={ value => this.returnTel(value['value'],'phone')}/>
                    </div>
                </li>
                <li>
                    <label htmlFor="email2">電子信箱</label>
                    <div className="input-box">
                        <input type="email" name="email" value={formObject['email']} id="email2" onChange={this.handleChange.bind(this)} />
                    </div>
                </li>
                <li>
                    <label>地址</label>
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
                        <input type="text" name="address" value={ formObject['address'] || "" } onChange={ this.handleChange.bind(this) } placeholder=""/>
                    </div>
                </li>
            </ul>
        );
    }

    componentDidMount() {
        this.returnForm();
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            formObject: { ...this.state.formObject, [name]:value }
        },()=>{
            this.returnForm();
        })
    }

    returnForm = () => {
        if( this.props.returnForm!=undefined ){
            const { formObject } = this.state;
            this.props.returnForm( formObject )
        }
    }
}