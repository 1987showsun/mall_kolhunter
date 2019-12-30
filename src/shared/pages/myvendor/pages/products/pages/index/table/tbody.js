/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link }       from 'react-router-dom';

export default (props) => {

    const { id, image, name, productStatus, productStatusText, categoryString, celebrityNum, price, sellPrice, vendorFee, modifiedData, createdDate } = props;

    return(
        <>
            <div className="table-new-cell head-action">
                {
                    productStatus!='none-auth'?(
                        <button
                            className = {`productStatus ${productStatus}`}
                            onClick   = {()=>{
                                props.tableButtonAction(props);
                            }}
                        >
                            {productStatusText}
                        </button>
                    ):(
                        <span
                            className = {`productStatus ${productStatus}`}
                        >
                            {productStatusText}
                        </span>
                    )
                }
            </div>
            <div className="table-new-cell image">
                <img src={image} alt={name} title="" />
            </div>
            <div className="table-new-cell">
                <Link to={`/myvendor/products/info/${id}`}>{name}</Link>
            </div>
            <div className="table-new-cell">{categoryString}</div>
            <div className="table-new-cell text-right money">
                <CurrencyFormat value={celebrityNum} displayType={'text'} thousandSeparator={true} />
            </div>
            <div className="table-new-cell text-right money">
                <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div className="table-new-cell text-right money">
                <CurrencyFormat value={sellPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div className="table-new-cell text-right">{vendorFee} ％</div>
            <div className="table-new-cell">{modifiedData}</div>
            <div className="table-new-cell">{createdDate}</div>
        </>
    );
}