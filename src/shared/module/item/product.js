/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                             from 'react';
import CurrencyFormat                    from 'react-currency-format';
import { Link }                          from 'react-router-dom';

// Images
import nullImages                        from '../../public/images/init/420x420initBlockImages.jpg';

// Stylesheets
import './public/stylesheets/style.scss';

export default class ProductItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            path: "",
            data: {
                token        : "",
                images       : nullImages,
                name         : "網紅電商 KOLL mall",
                price        : 0,
                sellPrice    : 0,
                modifyTimeMs : 0,
                createTimeMs : 0
            }
        }
    }

    static getDerivedStateFromProps( props, state ){

        let { data } = props;
        const dataImagesTypeOf = images => {
            if( Array.isArray( images ) ){
                return images.length!=0? images[0]['path'] : null;
            }
            return null;
        }

        return{
            path     : props.path,
            data     : {
                ...props.data,
                image: dataImagesTypeOf( data['images'] )
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { data } = this.state;
        return String(data['token'])!=String(nextProps.data['token']);
    }

    render(){

        const { path, data }       = this.state;
        const { name, image, price, sellPrice } = data;
        const discount             = ((Number(sellPrice)/Number(price))*10).toFixed(1);

        return(
            <figure className="card">
                <div className="img">
                    <Link to={path || ""}></Link>
                    <img src={image} alt={name} title="" />
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
}