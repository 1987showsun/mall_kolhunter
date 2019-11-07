/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link }       from 'react-router-dom';

// Stylesheets
import './public/stylesheets/style.scss';

const ProductItem = props => {

    const { path, data }       = props;
    const { name, images, price, sellPrice } = data;
    const discount             = ((Number(sellPrice)/Number(price))*10).toFixed(1);
    const dataImagesTypeOf     = images => {
        if( Array.isArray( images ) ){
            return images.length!=0? images[0]['path'] : null;
        }
        return null;
    }

    return(
        <figure className="card">
            <div className="img">
                <Link to={path || ""}></Link>
                <img src={dataImagesTypeOf(images)} alt={name} title="" />
                {
                    Math.floor(price)!=Math.floor(sellPrice) &&
                        <div className="discount"><span>{discount}折</span></div>
                }
            </div>
            <figcaption>
                <section className="figcaption-row">
                    <h3><Link to={path || ""}>{data['name']}</Link></h3>
                    {/* <h4><Link to="">Rimowa</Link></h4> */}
                </section>
                <div className="figcaption-row money">
                    <span className="price">
                        {
                            Math.floor(price)!=Math.floor(sellPrice) &&
                                <CurrencyFormat value={Math.floor(price)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        }
                    </span>
                    <span className="priceSale">
                        <CurrencyFormat value={Math.floor(sellPrice)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </span>
                </div>
            </figcaption>
        </figure>
    );
}

export default ProductItem;