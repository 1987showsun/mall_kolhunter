// 三聯式
import React from 'react';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

// Json
import county_area from '../../../../../public/json/TWzipcode.json';

const city = Object.keys(county_area)[0];
const district = Object.keys(county_area[city])[0];

class Triplicate extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                name: "",
                invoice: "",
                title: "",
                zipcode: "",
                city: city || "",
                district: district || "",
                address: ""
            }
        }
    }

    static getDerivedStateFromProps( props,state ) {
        return null;
    }

    render(){

        const { formObject } = this.state;

        return(
            <ul className="card-form-list">
                <li>
                    <label>收件人</label>
                    <div className="input-box">
                        <input type="text" name="name" value={formObject['name']} onChange={this.handleChange.bind(this)} />
                    </div>
                </li>
                <li>
                    <label>統一編號</label>
                    <div className="input-box">
                        <CurrencyFormat value={formObject['invoice']} format="########" onValueChange={ value => {
                            this.setState({
                                formObject: { ...this.state.formObject, invoice: value['value'] }
                            })
                        }}/>
                    </div>
                </li>
                <li>
                    <label>抬頭</label>
                    <div className="input-box">
                        <input type="text" name="title" value={formObject['title']} onChange={this.handleChange.bind(this)} />
                    </div>
                </li>
                <li>
                    <label>寄送地址</label>
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
                const districtArr = county_area[val];
                const district = Object.keys(districtArr)[0];
                const zipcode = districtArr[district];
                formObject = { 
                    ...formObject,
                    [name]: val,
                    zipcode: zipcode,
                    district: district
                };
                break;
            
            case 'district':
                formObject = { 
                    ...formObject,
                    [name]: val,
                    zipcode: e.target.options[e.target.selectedIndex].dataset.zipcode 
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
        },()=>{
            this.returnForm();
        })
    }

    returnForm = () => {
        if( this.props.returnForm!=undefined ){
            const { formObject } = this.state;
            this.props.returnForm(formObject);
        }
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )(Triplicate);