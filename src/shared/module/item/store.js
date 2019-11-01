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
                    <img src={data['photo']} alt={data['storeName']} title={data['storeName']} />
                </div>
                <figcaption>
                    <div className="figcaption-row">
                        <h3><Link to={`${path || ""}`} dangerouslySetInnerHTML={{__html: data['storeName']}} /></h3>
                    </div>
                    <div className="figcaption-row" data-content="space-between">
                        <ul className="figcaption-row-list">
                            <li data-content="space-between">
                                <div className="label">商品總數</div>
                                <div className="value">
                                    <CurrencyFormat value={data['productCount']} displayType={'text'} thousandSeparator={true} />
                                </div>
                            </li>
                            <li data-content="space-between">
                                <div className="label">累計銷量</div>
                                <div className="value">
                                    <CurrencyFormat value={data['saleTotal']||0} displayType={'text'} thousandSeparator={true} />
                                </div>
                            </li>
                        </ul>
                    </div>
                </figcaption>
            </figure>
        );
    }
}