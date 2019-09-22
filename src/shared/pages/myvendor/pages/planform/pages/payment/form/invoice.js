import React from 'react';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

class Invoice extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            formObject: {
                invoice: "",
                title: "",
                recipient: ""
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <React.Fragment>
                <ul className="program-form-ul">
                    <li>
                        <label>統一編號</label>
                        <div className="input-box">
                            <CurrencyFormat format="########" onValueChange={ value => this.returnInvoice(value['formattedValue'],'invoice')}/>
                        </div>
                    </li>
                    <li>
                        <label>發票抬頭</label>
                        <div className="input-box">
                            <input type="text" name="title" value={formObject['title']} onChange={ this.handleChange.bind(this) } placeholder="" />
                        </div>
                    </li>
                    <li>
                        <label>發票收件人</label>
                        <div className="input-box">
                            <input type="text" name="recipient" value={formObject['recipient']} onChange={ this.handleChange.bind(this) } placeholder="" />
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

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Invoice );