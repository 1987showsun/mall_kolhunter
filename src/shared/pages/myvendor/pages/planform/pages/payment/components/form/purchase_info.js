import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';

// Json
import county_area from '../../../../../../../../public/json/TWzipcode.json';

const city     = Object.keys(county_area)[0];
const district = Object.keys(county_area[city])[0];
const zipcode  = county_area[city][district];

class PurchaseInfo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            profile: {},
            formObject: {
                orderCompanyName          : "",
                orderName                 : "",
                orderEmail                : "",
                orderPhone                : "",
                orderZipCode              : zipcode,
                orderCity                 : city,
                orderDist                 : district,
                orderAddress              : ""
            }
        }
    }

    static getDerivedStateFromProps( props,state ) {
        let profile    = { ...state.profile };
        let formObject = { ...state.formObject };
        if( Object.keys(props.profile).length!=0 && Object.keys(profile).length==0 ){
            profile    = { ...props.profile };
            formObject = {
                ...formObject,
                orderCompanyName           : props.profile['company']   || "",
                orderName                  : props.profile['contactor'] || "",
                orderEmail                 : props.profile['email']     || "",
                orderPhone                 : props.profile['phone']     || "",
                orderZipCode               : props.profile['zipcode']   || "",
                orderCity                  : props.profile['city']      || "",
                orderDist                  : props.profile['district']  || "",
                orderAddress               : props.profile['address']   || ""
            }
        }

        return {
            profile       : profile,
            formObject    : formObject
        };
    }

    render(){

        const { formObject } = this.state;

        return(
            <React.Fragment>
                <ul className="table-row-list">
                    <li>
                        <label>* 公司</label>
                        <div className="input-box">
                            <input type="text" name="orderCompanyName" value={ formObject['orderCompanyName'] || "" } onChange={ this.handleChange.bind(this) } placeholder=""/>
                        </div>
                    </li>
                    <li>
                        <label>* 聯絡人</label>
                        <div className="input-box">
                            <input type="text" name="orderName" value={ formObject['orderName'] || "" } onChange={ this.handleChange.bind(this) } placeholder=""/>
                        </div>
                    </li>
                    <li>
                        <label>* 信箱</label>
                        <div className="input-box">
                            <input type="email" name="orderEmail" value={ formObject['orderEmail'] || "" } onChange={ this.handleChange.bind(this) } placeholder=""/>
                        </div>
                    </li>
                    <li>
                        <label>* 聯絡電話</label>
                        <div className="input-box">
                            <CurrencyFormat value={ formObject['orderPhone'] || "" } format="##########" onValueChange={ value => this.returnTel(value['formattedValue'],'orderPhone')}/>
                        </div>
                    </li>
                    <li>
                        <label>* 聯絡地址</label>
                        <div className="input-box select">
                            <select name="orderCity" value={formObject['orderCity'] || ""} onChange={ this.handleChange.bind(this) }>
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
                            <select name="orderDist" value={formObject['orderDist'] || ""} onChange={ this.handleChange.bind(this) }>
                                <option value="">請選擇鄉鎮市區</option>
                                {
                                    formObject['orderCity']!=undefined && formObject['orderCity']!=""? (
                                        Object.keys(county_area[formObject['orderCity']]).map( (item,i) => {
                                            return(
                                                <option key={`district_${i}`} value={item} data-zipcode={county_area[formObject['orderCity']][item]} >{item}</option>
                                            )
                                        })
                                    ):(
                                        null
                                    )
                                }
                            </select>
                        </div>
                        <div className="input-box">
                            <input type="text" name="orderAddress" value={ formObject['orderAddress'] || "" } onChange={ this.handleChange.bind(this) } placeholder=""/>
                        </div>
                    </li>
                </ul>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.returnHandleChange();
    }

    componentDidUpdate(prevProps, prevState) {
        const formObject = this.state.formObject;
        const prevStateFormObject = prevState.formObject;
        let comparison = Object.keys( formObject ).some( keys => formObject[keys]!=prevStateFormObject[keys] );
        if( comparison ){
            this.returnHandleChange();
        }
    }
    

    handleChange = ( e ) => {

        const name = e.target.name;
        const val = e.target.value;
        let { formObject } = this.state;

        switch( name ){
            case 'area_code':
                formObject = { 
                    ...formObject,
                    [name]     : val,
                    orderPhone : "" 
                };
                break;
            
            case 'orderCity':
                const districtArr = county_area[val];
                const district = Object.keys(districtArr)[0];
                const zipcode = districtArr[district];
                formObject = { 
                    ...formObject,
                    [name]       : val,
                    orderZipCode : zipcode,
                    orderDist    : district
                };
                break;
            
            case 'orderDist':
                formObject = { 
                    ...formObject,
                    [name]       : val,
                    orderZipCode : e.target.options[e.target.selectedIndex].dataset.zipcode 
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

    returnTel = ( val,name ) => {
        const { formObject } = this.state;
        this.setState({
            formObject: { ...formObject, [name]: val }
        })
    }

    returnHandleChange = () => {
        let { formObject } = this.state;
        if( this.props.returnHandleChange ){
            this.props.returnHandleChange(formObject);
        }
    }
}

const mapStateToProps = state => {
    return{
        profile: state.myvendor.info
    }
}

export default connect( mapStateToProps )( PurchaseInfo );