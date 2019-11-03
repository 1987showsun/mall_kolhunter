import React          from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link }       from 'react-router-dom';

// Stylesheets
import './public/stylesheets/style.scss';

export default class Product extends React.Component{
    render(){

        const { path, data } = this.props;
        const discount       = ((Number(data['sellPrice'])/Number(data['price']))*10).toFixed(1);
        
        return(
            <figure className="card">
                <div className="img">
                    <Link to={path || ""}></Link>
                    <img src={this.dataImagesTypeOf(data['images'])} alt={data['name']} title={data['name']} />
                    {
                        Math.floor(data['price'])!=Math.floor(data['sellPrice']) &&
                            <div className="discount"><span>{discount}折</span></div>
                    }
                </div>
                <figcaption>
                    <section className="figcaption-row">
                        <h3><Link to={path || ""}>{data['name']}</Link></h3>
                        {/* <h4><Link to="">Rimowa</Link></h4> */}
                    </section>
                    <div className="figcaption-row money">
                        {
                            Math.floor(data['price'])==Math.floor(data['sellPrice'])? (
                                <React.Fragment>
                                    <span className="price"></span>
                                    <span className="priceSale">${ Math.floor(data['sellPrice']) }</span>
                                </React.Fragment>
                            ):(
                                <React.Fragment>
                                    <span className="price">${ Math.floor(data['price']) }</span>
                                    <span className="priceSale">${ Math.floor(data['sellPrice']) }</span>
                                </React.Fragment>
                            )
                        }
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