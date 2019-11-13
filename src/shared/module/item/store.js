/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React,{ useState, useEffect }           from 'react';
import CurrencyFormat  from 'react-currency-format';
import { Link }        from 'react-router-dom';

// Stylesheets
import './public/stylesheets/style.scss';

export default class StoreItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            path: props.path,
            data: props.data
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { data } = this.state;
        return String(data['id'])!=String(nextProps.data['id']);
    }

    render(){
        const { path="", data } = this.state;
        const { photo="", name="", productCount=0, saleTotal=0 } = data;
        return(
            <figure className="card">
                <div className="img" data-round="true" >
                    <Link to={path}></Link>
                    <img src={photo} alt={name} title="" />
                </div>
                <figcaption>
                    <div className="figcaption-row">
                        <h3><Link to={path} dangerouslySetInnerHTML={{__html: name}} /></h3>
                    </div>
                    <div className="figcaption-row" data-content="space-between">
                        <ul className="figcaption-row-list">
                            <li data-content="space-between">
                                <div className="label">商品總數</div>
                                <div className="value">
                                    <CurrencyFormat value={productCount} displayType={'text'} thousandSeparator={true} />
                                </div>
                            </li>
                            {/* <li data-content="space-between">
                                <div className="label">累計銷量</div>
                                <div className="value">
                                    <CurrencyFormat value={saleTotal} displayType={'text'} thousandSeparator={true} />
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </figcaption>
            </figure>
        );
    }
}