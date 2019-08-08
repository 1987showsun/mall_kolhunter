import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';

// Stylesheets
import './public/stylesheets/style.scss';

export default class Product extends React.Component{
    render(){

        const { path, data } = this.props;
        
        return(
            <figure className="card">
                <div className="img">
                    <Link to={path || ""}></Link>
                    <img src={data['image']} alt={data['name']} title={data['name']} />
                </div>
                <figcaption>
                    <section className="figcaption-row">
                        <h3><Link to={path || ""}>{data['name']}</Link></h3>
                        {/* <h4><Link to="">Rimowa</Link></h4> */}
                    </section>
                    <div className="figcaption-row money">
                        <span className="price">{data['price']}</span>
                        <span className="priceSale">{data['sellPrice']}</span>
                    </div>
                </figcaption>
            </figure>
        );
    }
}