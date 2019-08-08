import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';

// Stylesheets
import './public/stylesheets/style.scss';

export default class StoreItem extends React.Component{
    render(){

        const { path, data } = this.props;

        return(
            <figure className="card">
                <div className="img" data-round="true" >
                    <Link to={`${path || ""}`}></Link>
                    <img src="https://static.kolhunter.com/kol/cyberImg-1429.jpg" alt="蔡阿嘎" title="蔡阿嘎" />
                </div>
                <figcaption>
                    <div className="figcaption-row">
                        <h3><Link to={`${path || ""}`}>蔡阿嘎</Link></h3>
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