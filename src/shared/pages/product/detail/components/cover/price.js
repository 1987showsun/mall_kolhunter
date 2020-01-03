/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React               from 'react';
import CurrencyFormat      from 'react-currency-format';

const Price = ({price=0, sellPrice=0}) => {

    const discount = ((Number(sellPrice)/Number(price))*10).toFixed(1);

    return(
        <div className="cover-money">
            {
                price!=sellPrice &&
                    <CurrencyFormat className="cover-money-price" value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            }
            <CurrencyFormat className="cover-money-sellPrice" value={sellPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            {
                price!=sellPrice &&
                    <div className="cover-money-discount">{discount}折</div>
            }
        </div>
    );
}

export default Price;