import React from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

export default class Item extends React.Component{
    render(){
        return(
            <li className="order-body">
                <div className="img-wrap">
                    <img src="https://s.yimg.com/zp/MerchandiseImages/8BF8055C31-Product-22351228.jpg" alt="PHILIPS飛利浦 49吋 4K UHD聯網液晶顯示器+視訊盒" title="" />
                </div>
                <div>
                    <h3>PHILIPS飛利浦 49吋 4K UHD聯網液晶顯示器+視訊盒</h3>
                    <span>產品編號：49PUH7032</span>
                </div>
                <div>
                    <CurrencyFormat value={`1`} displayType={'text'} thousandSeparator={true}/>
                </div>
                <div>
                    <CurrencyFormat value={`19800`} displayType={'text'} thousandSeparator={true}/>
                </div>
                <div>
                    <Link to="">我要退貨</Link>
                    <Link to="">我要詢問</Link>
                </div>
            </li>
        );
    }
}