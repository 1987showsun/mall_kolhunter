import React from 'react';
import CurrencyFormat from 'react-currency-format';

export default class Card extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                cardCode: "",
                cardVerified: "",
                cardExpiry: ""
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <React.Fragment>
                <ul className="card-form-list">
                    <li>
                        <label>卡號</label>
                        <div className="input-box">
                            <CurrencyFormat value={ formObject['cardCode'] } format="#### #### #### ####" placeholder="#### #### #### ####" onValueChange={ value => {
                                this.setState({
                                    formObject: { ...formObject, cardCode: value['value'] }
                                },()=>{
                                    this.returnForm();
                                })
                            }}/>
                        </div>
                    </li>
                    <li>
                        <label>驗證碼</label>
                        <div className="input-box">
                            <CurrencyFormat value={ formObject['cardVerified'] } format="####" placeholder="###" onValueChange={ value => {
                                this.setState({
                                    formObject: { ...formObject, cardVerified: value['value'] }
                                },()=>{
                                    this.returnForm();
                                })
                            }}/>
                        </div>
                    </li>
                    <li>
                        <label>到期時間</label>
                        <div className="input-box">
                            <CurrencyFormat value={ formObject['cardExpiry'] } format={this.cardExpiry} placeholder="MM/YY" onValueChange={ value => {
                                this.setState({
                                    formObject: { ...formObject, cardExpiry: value['value'] }
                                },()=>{
                                    this.returnForm();
                                })
                            }}/>
                        </div>
                    </li>
                </ul>
            </React.Fragment>
        );
    }

    cardExpiry = (val) => {

        const limit = (val, max) => {
            if (val.length === 1 && val[0] > max[0]) {
              val = '0' + val;
            }
            if (val.length === 2) {
              if (Number(val) === 0) {
                val = '01';
            } else if (val > max) {
                val = max;
              }
            }
            return val;
        }

        let month = limit(val.substring(0, 2), '12');
        let year = val.substring(2, 4);
        return month + (year.length ? '/' + year : '');
    }

    returnForm = () => {
        if( this.props.returnForm!=undefined ){
            const { formObject } = this.state;
            this.props.returnForm( formObject )
        }
    }
}