
import React from 'react';
import CurrencyFormat from 'react-currency-format';

export default class Digital extends React.Component{
    render(){
        const { productTotal, data } = this.props;
        return(
            <div className="figcaption-row">
                <ul className="figcaption-info-ul">
                    <li>
                        <div className="figcaption-ul-head">總成交金額</div>
                        <div className="figcaption-ul-content">
                            <CurrencyFormat value={data['salesAmount']} displayType={'text'} thousandSeparator={true} />
                        </div>
                    </li>
                    <li>
                        <div className="figcaption-ul-head">商品總數</div>
                        <div className="figcaption-ul-content">
                            <CurrencyFormat value={productTotal} displayType={'text'} thousandSeparator={true} />
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}