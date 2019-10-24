// 三聯式
import React from 'react';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

// Json
import county_area from '../../../../../../../../../public/json/TWzipcode.json';

const city = Object.keys(county_area)[0];
const district = Object.keys(county_area[city])[0];

class Triplicate extends React.Component{

    constructor(props){
        super(props);
        const { company, invoice } = props.profile;
        this.state = {
            formObject: {
                invoiceCompanyName      : company,
                invoiceCompanyUniNumber : invoice
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
                    <label>公司名稱</label>
                    <div className="input-box">
                        <input type="text" name="invoiceCompanyName" value={formObject['invoiceCompanyName']} onChange={this.handleChange.bind(this)} />
                    </div>
                </li>
                <li>
                    <label>統一編號</label>
                    <div className="input-box">
                        <CurrencyFormat value={formObject['invoiceCompanyUniNumber']} format="########" onValueChange={ value => {
                            this.setState({
                                formObject: { ...this.state.formObject, invoiceCompanyUniNumber: value['value'] }
                            },()=>{
                                this.returnForm();
                            })
                        }}/>
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
            
            case 'invoiceCity':
                const districtArr = county_area[val];
                const district = Object.keys(districtArr)[0];
                const zipcode = districtArr[district];
                formObject = { 
                    ...formObject,
                    [name]: val,
                    invoiceZipcode: zipcode,
                    invoiceDist: district
                };
                break;
            
            case 'invoiceDist':
                formObject = { 
                    ...formObject,
                    [name]: val,
                    invoiceZipcode: e.target.options[e.target.selectedIndex].dataset.invoiceZipcode 
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