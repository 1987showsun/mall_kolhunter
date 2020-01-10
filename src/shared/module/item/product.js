/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React, { useState, useEffect }    from 'react';
import CurrencyFormat                    from 'react-currency-format';
import { Link }                          from 'react-router-dom';

// Images
import nullImages                        from '../../public/images/init/420x420initBlockImages.jpg';
import up18                              from '../../public/images/18up.png';

// Stylesheets
import './public/stylesheets/style.scss';

export default ({path='', data}) => {

    data = { 
        ...data, 
        image: ()=>{
            if( Array.isArray( data['images'] ) ){
                return data['images'].length!=0? data['images'][0]['path'] : null;
            }
            return null;
        }
    };
    const {  name='', image, price=0, sellPrice=0, adult } = data;
    const discount             = ((Number(sellPrice)/Number(price))*10).toFixed(1);

    return(
        <figure className="card">
            <div className="img">
                <Link to={path}></Link>
                {
                    adult &&
                        <div className="adult-mask">
                            <img src={up18} alt={name} title="" />
                        </div>
                }
                <img className={`blur ${adult}`} src={image()} alt={name} title="" />
                {
                    Math.floor(price)!=Math.floor(sellPrice) &&
                        <div className="discount"><span>{discount}折</span></div>
                }
            </div>
            <figcaption>
                <section className="figcaption-row">
                    <h3><Link to={path}>{name}</Link></h3>
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