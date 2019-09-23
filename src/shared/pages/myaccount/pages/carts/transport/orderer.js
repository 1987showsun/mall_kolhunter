import React from 'react';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

// Jsons
import county_area from '../../../../../public/json/TWzipcode.json';

// Lang
import lang from '../../../../../public/lang/lang.json';

const city = Object.keys(county_area)[0];
const district = Object.keys(county_area[city])[0];

export default  class Order extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                name: "",
                email: "",
                phone: "",
                zipCode: county_area[city][district],
                city: city,
                district: district,
                address: "",
                ...props.data
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <ul className="card-form-list">
                <li>
                    <label htmlFor="name">＊姓名</label>
                    <div className="input-box">
                        <input type="text" name="name" value={formObject['name'] || ""} id="name" onChange={this.handleChange.bind(this)} placeholder=""/>
                    </div>
                </li>
                <li>
                    <label htmlFor="phone">＊聯絡電話</label>
                    <div className="input-box">
                        <CurrencyFormat id="phone" value={formObject['phone'] || ""} format="##########" onValueChange={ value => {
                            this.setState({
                                formObject: { ...this.state.formObject, phone: value['value'] }
                            },()=>{
                                this.returnForm();
                            })
                        }}/>
                    </div>
                </li>
                <li>
                    <label htmlFor="email">＊電子信箱</label>
                    <div className="input-box">
                        <input type="email" name="email" value={formObject['email'] || ""} id="email" onChange={this.handleChange.bind(this)} />
                    </div>
                </li>
                <li>
                    <label htmlFor="">＊地址</label>
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
        let { formObject } = this.state;

        switch( name ){
            case 'city':
                const districtArr = county_area[value];
                const district = Object.keys(districtArr)[0];
                const zipcode = districtArr[district];
                formObject = { 
                    ...formObject,
                    [name]: value,
                    zipCode: zipcode,
                    district: district
                }
                break;

            case 'district':
                formObject = { 
                    ...formObject,
                    [name]: value,
                    zipcode: e.target.options[e.target.selectedIndex].dataset.zipcode 
                };
                break;

            default: 
                formObject = {
                     ...formObject, 
                     [name]: value
                }
        }

        this.setState({
            formObject
        },()=>{
            this.returnForm();
        });
    }

    returnForm = () => {
        const { formObject } = this.state;
        const returnFormObject = {
            orderName: formObject['name'],
            orderEmail: formObject['email'],
            orderPhone: formObject['phone'],
            orderCellPhone: formObject['phone'],
            orderZipCode: formObject['zipCode'],
            orderCity: formObject['city'],
            orderDist: formObject['district'],
            orderAddress: formObject['address']
        }
        if( this.props.mergeFunction!=undefined ){
            this.props.mergeFunction( returnFormObject )
        }
    }
}