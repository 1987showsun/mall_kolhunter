import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';

export default class StoreItem extends React.Component{
    render(){
        return(
            <figure>
                <div className="card-item-img">
                    <img src="https://static.kolhunter.com/kol/235/20190703/90d5b6148eb40ee9ae2f523d962a37a6.jpeg" alt="" title="" />
                </div>
                <figcaption>
                    <div className="figcaption-row">
                        <h3><Link to="">飆捍-館長成吉思汗</Link></h3>
                    </div>
                    <div className="figcaption-row" data-content="space-between">
                        <div className="label">品項數</div>
                        <div className="value">
                            <CurrencyFormat value="246981" displayType={'text'} thousandSeparator={true} />
                        </div>
                    </div>
                    <div className="figcaption-row" data-content="space-between">
                        <div className="label">累計銷量</div>
                        <div className="value">
                            <CurrencyFormat value="12456981" displayType={'text'} thousandSeparator={true} />
                        </div>
                    </div>
                </figcaption>
            </figure>
        );
    }
}