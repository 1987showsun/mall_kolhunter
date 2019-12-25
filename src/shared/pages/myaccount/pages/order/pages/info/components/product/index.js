/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

// 產品列表
import React          from 'react';
import { connect }    from 'react-redux';
import CurrencyFormat from 'react-currency-format';

// Components
import Item           from './item';


const Index = props => {

    const { list, amount } = props;

    return(
        <section className="container-unit">
            <div className="unit-head">
                <h3>購買商品</h3>
            </div>
            <div className="cart-product-wrap">
                {
                    list.map((item,i) => {
                        return(
                            <Item 
                                key       = {i} 
                                data      = {item}
                                location  = {location}
                            />
                        )
                    })
                }
                <div className="total-wrap">
                     <span className="label">購買總金額：</span>
                     <CurrencyFormat className="total-money" value={amount} displayType={'text'} thousandSeparator={true}/>
                 </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => {
    return{
    }
}

export default connect( mapStateToProps )( Index );