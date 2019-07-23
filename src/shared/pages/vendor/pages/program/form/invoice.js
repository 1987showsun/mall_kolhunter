import React from 'react';
import CurrencyFormat from 'react-currency-format';

// Json
import area_code from '../../../../../public/json/TWareacode.json';
import county_area from '../../../../../public/json/TWzipcode.json';

export default class Invoice extends React.Component{

    constructor(props){

        const initCounty = Object.keys(county_area)[0];
        const initCountyArea = Object.keys(county_area[initCounty])[0];

        super(props);
        this.state = {
            formObject: {
                invoice: "",
                title: "",
                recipient: "",
                county: initCounty,
                county_area: initCountyArea,
                address: ""
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <React.Fragment>
                <ul className="program-form-ul">
                    <li>
                        <label>＊統一編號</label>
                        <div className="input-box">
                            <CurrencyFormat format="########" onValueChange={ value => this.returnInvoice(value['formattedValue'],'invoice')}/>
                        </div>
                    </li>
                    <li>
                        <label>＊發票抬頭</label>
                        <div className="input-box">
                            <input type="text" name="title" value={formObject['title']} onChange={ this.handleChange.bind(this) } placeholder="" />
                        </div>
                    </li>
                    <li>
                        <label>＊發票收件人</label>
                        <div className="input-box">
                            <input type="text" name="recipient" value={formObject['recipient']} onChange={ this.handleChange.bind(this) } placeholder="" />
                        </div>
                    </li>
                    <li>
                        <label>＊寄送地址</label>
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
        this.setState({
            formObject
        },()=>{
            this.returnHandleChange();
        })
    }

    returnInvoice = ( val,name ) => {
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