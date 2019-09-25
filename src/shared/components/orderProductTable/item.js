import React from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

// Lang
import lang from '../../public/lang/lang.json';

export default class Item extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ...props
        }
    }

    render(){
        return(
            <li className="order-body">
                <div className="img-wrap">
                    <img src={this.state.image} title="" />
                </div>
                <div>
                    <h3><Link to={`/detail/${this.state.productToken}`} target="_blank">{this.state.productName}</Link></h3>
                    <span className="span-row">尺寸/型號/顏色：{this.state.specName}</span>
                    <span className="span-row">產品編號：{this.state.specToken}</span>
                </div>
                <div>{ lang['zh-TW']['deliveryStatus'][this.state.deliveryStatus]}</div>
                <div><CurrencyFormat value={this.state.count} displayType={'text'} thousandSeparator={true}/></div>
                <div><CurrencyFormat value={this.state.amount} displayType={'text'} thousandSeparator={true}/></div>
            </li>
        );
    }
}