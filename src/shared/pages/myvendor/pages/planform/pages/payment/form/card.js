import React from 'react';
import CurrencyFormat from 'react-currency-format';

export default class Card extends React.Component{

    constructor(props){
        super(props);
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        const port     = window.location.port;
        const mergeURL = `${protocol}//${hostname}${port!=""? `:${port}`: ''}/myvendor/planform/payment/step3?payMethod=cc`;
        this.state = {
            formObject: {
                returnURL: mergeURL,
                cardno: "",
                cvc: "",
                exp: ""
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
                            <CurrencyFormat value={ formObject['cardno'] } format="#### #### #### ####" placeholder="#### #### #### ####" onValueChange={ value => {
                                this.setState({
                                    formObject: { ...formObject, cardno: value['value'] }
                                },()=>{
                                    this.returnHandleChange();
                                })
                            }}/>
                        </div>
                    </li>
                    <li>
                        <label>驗證碼</label>
                        <div className="input-box">
                            <CurrencyFormat value={ formObject['cvc'] } format="###" placeholder="###" onValueChange={ value => {
                                this.setState({
                                    formObject: { ...formObject, cvc: value['value'] }
                                },()=>{
                                    this.returnHandleChange();
                                })
                            }}/>
                        </div>
                    </li>
                    <li>
                        <label>到期時間</label>
                        <div className="input-box">
                            <CurrencyFormat value={ formObject['exp'] } format={this.cardExpiry} placeholder="YY/MM" onValueChange={ value => {
                                this.setState({
                                    formObject: { ...formObject, exp: value['value'] }
                                },()=>{
                                    this.returnHandleChange();
                                })
                            }}/>
                        </div>
                    </li>
                </ul>
            </React.Fragment>
        );
    }

    componentDidMount(){
        this.returnHandleChange();
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

        let month = limit(val.substring(2, 4), '12');
        let year = val.substring(0, 2);
        return (year.length ? year+'/' : '') + month;
    }

    returnHandleChange = () => {
        if( this.props.returnHandleChange!=undefined ){
            const { formObject } = this.state;
            this.props.returnHandleChange(formObject);
        }
    } 
}