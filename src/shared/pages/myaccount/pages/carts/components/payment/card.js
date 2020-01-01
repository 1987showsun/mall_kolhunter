/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';
import CurrencyFormat from 'react-currency-format';

export default class Card extends React.Component{

    constructor(props){
        super(props);
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        const port     = window.location.port;
        const mergeURL = `${protocol}//${hostname}${port!=""? `:${port}`: ''}/myaccount/payment/success?payMethod=cc`;
        this.state     = {
            cartTotalAmount : props.cartTotalAmount,
            formObject      : {
                returnURL     : `${mergeURL}`,
                cardno        : "",
                cvc           : "",
                exp           : "",
                reExp         : "",
                Inst          : 0
            }
        }
    }

    static getDerivedStateFromProps(props,state){
        return{
            cartTotalAmount : props.cartTotalAmount
        }
    }

    render(){

        const { formObject, cartTotalAmount } = this.state;
        const { cardno, cvc, exp, Inst }      = formObject;

        return(
            <React.Fragment>
                <ul className="card-form-list">
                    <li>
                        <label>卡號</label>
                        <div>
                            <div className="input-box">
                                <CurrencyFormat value={ formObject['cardno'] } format="#### #### #### ####" placeholder="#### #### #### #### (僅限16位數字)" onValueChange={ value => {
                                    this.setState({
                                        formObject: { ...formObject, cardno: value['value'] }
                                    },()=>{
                                        this.returnHandleChange();
                                    })
                                }}/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>驗證碼</label>
                        <div>
                            <div className="input-box">
                                <CurrencyFormat value={ formObject['cvc'] } format="###" placeholder="### (僅限3位數字)" onValueChange={ value => {
                                    this.setState({
                                        formObject: { ...formObject, cvc: value['value'] }
                                    },()=>{
                                        this.returnHandleChange();
                                    })
                                }}/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>到期時間</label>
                        <div>
                            <div className="input-box">
                                <CurrencyFormat value={ formObject['exp'] } format={this.cardExpiry} placeholder="MM/YY" onValueChange={ value => {
                                    const valueArray = value['formattedValue'].split('/');
                                    const YY = valueArray[1]!=undefined? (valueArray[1].length<2? `0${valueArray[1]}`:valueArray[1]):'01';
                                    const MM = valueArray[0]!=undefined? (valueArray[0].length<2? `0${valueArray[0]}`:valueArray[0]):'01';
                                    this.setState({
                                        formObject: { ...formObject, exp: value['value'], reExp: `${YY}${MM}`}
                                    },()=>{
                                        this.returnHandleChange();
                                    })
                                }}/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>分期期數</label>
                        <div>
                            <label htmlFor="Inst0" className="radio block-radio">
                                <input id="Inst0" type="radio" name="Inst" value={0} checked={Inst==0} onChange={this.handleChange.bind(this)}/>
                                <div className="block-rodio-text">
                                    <span className="main-text">一次付清</span>
                                </div>
                            </label>
                            {/* <label htmlFor="Inst3" className="radio block-radio">
                                <input id="Inst3" type="radio" name="Inst" value={3} checked={Inst==3} onChange={this.handleChange.bind(this)}/>
                                <div className="block-rodio-text">
                                    <span className="main-text">3 期</span>
                                    <span className="sub-text">每期約：{Math.ceil(cartTotalAmount/3)}<br/>(餘額將併入第一期帳單)</span>
                                </div>
                            </label> */}
                        </div>
                    </li>
                </ul>
            </React.Fragment>
        );
    }

    componentDidMount(){
        this.returnHandleChange();
    }

    handleChange = (e) => {
        const { formObject }  = this.state;
        const { name, value } = e.target;
        this.setState({
            formObject : {
                ...formObject,
                [name] : value
            }
        },()=>{
            this.returnHandleChange();
        })
    }

    cardExpiry = (val) => {
        const limit = (val, max) => {
            if(val.length === 1 && val[0] > max[0]) {
                val = '0' + val;
            }
             
            if(val.length === 2) {
                if (Number(val) === 0) {
                  val = '01';
             
            }else if(val > max) {
                  val = max;
                }
            }
             
            return val;
        }
        let month = limit(val.substring(0, 2), '12');
        let year = val.substring(2, 4);
        return month + (year.length ? '/' + year : '');
    }

    returnHandleChange = () => {
        if( this.props.returnHandleChange!=undefined ){
            const { formObject } = this.state;
            this.props.returnHandleChange({
                returnURL: formObject['returnURL'],
                cardno   : formObject['cardno'],
                cvc      : formObject['cvc'],
                exp      : formObject['reExp'],
                Inst     : Number(formObject['Inst'])
            });
        }
    } 
}