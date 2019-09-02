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
                    <img src={this.dataImagesTypeOf(data['images'])} alt={data['name']} title={data['name']} />
                </div>
                <figcaption>
                    <section className="figcaption-row">
                        <h3><Link to={path || ""}>{data['name']}</Link></h3>
                        {/* <h4><Link to="">Rimowa</Link></h4> */}
                    </section>
                    <div className="figcaption-row money">
                        <span className="price">{ Math.floor(data['price']) }</span>
                        <span className="priceSale">{ Math.floor(data['sellPrice']) }</span>
                    </div>
                </figcaption>
            </figure>
        );
    }

    dataImagesTypeOf = ( images ) => {
        if( Array.isArray( images ) ){
            return images.length!=0? images[0]['path'] : null;
        }
        return null;
    }
}