import React                    from 'react';
import CurrencyFormat           from 'react-currency-format';
import { FontAwesomeIcon }      from '@fortawesome/react-fontawesome';
import { faCopy }               from '@fortawesome/free-solid-svg-icons';

// Jsons
import county_area              from '../../../../../../public/json/TWzipcode.json';

// Lang
import lang                     from '../../../../../../public/lang/lang.json';

const city     = Object.keys(county_area)[0];
const district = Object.keys(county_area[city])[0];

export default class Recipient extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            copyOrdererFormObject: props.copyOrdererFormObject,
            formObject: {
                name: "",
                phone: "",
                email: "",
                zipcode: county_area[city][district],
                city: city,
                dist: district,
                address: "",
            }
        }
    }

    static getDerivedStateFromProps( props,state ){
        return {
            copyOrdererFormObject: props.copyOrdererFormObject
        };
    }

    render(){
        const { formObject } = this.state;
        return(
            <React.Fragment>
                <ul className="card-form-list">
                    <li>
                        <label htmlFor="name2">＊姓名</label>
                        <div className="input-box">
                            <input type="text" name="name" value={formObject['name']} id="name2" onChange={this.handleChange.bind(this)} />
                        </div>
                    </li>
                    <li>
                        <label htmlFor="phone2">＊聯絡電話</label>
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
                        <label htmlFor="email2">＊電子信箱</label>
                        <div className="input-box">
                            <input type="email" name="email" value={formObject['email']} id="email2" onChange={this.handleChange.bind(this)} />
                        </div>
                    </li>
                    <li>
                        <label>＊地址</label>
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
                            <select name="dist" value={formObject['dist'] || ""} onChange={ this.handleChange.bind(this) }>
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
                <button type="button" className="basic copy-btn" onClick={this.copyOrderer.bind(this)}>
                    <i><FontAwesomeIcon icon={faCopy}/></i>
                    同購買人
                </button>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.returnForm();
    }

    copyOrderer = () => {
        const { copyOrdererFormObject } = this.state;
        this.setState({
            formObject: { 
                name: copyOrdererFormObject['orderName'],
                phone: copyOrdererFormObject['orderPhone'],
                email: copyOrdererFormObject['orderEmail'],
                zipcode: copyOrdererFormObject['orderZipCode'],
                city: copyOrdererFormObject['orderCity'],
                dist: copyOrdererFormObject['orderDist'],
                address: copyOrdererFormObject['orderAddress']
            }
        },()=>{
            this.returnForm();
        })
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
        })
    }

    returnForm = () => {
        const { formObject } = this.state;
        const returnFormObject = {
            deliveryName: formObject['name'],
            deliveryPhone: formObject['phone'],
            deliveryCellPhone: formObject['phone'],
            deliveryEmail: formObject['email'],
            deliveryZipCode: formObject['zipcode'],
            deliveryCity: formObject['city'],
            deliveryDist: formObject['dist'],
            deliveryAddress:  formObject['address']
        }
        if( this.props.mergeFunction!=undefined ){
            this.props.mergeFunction( returnFormObject )
        }
    }
}