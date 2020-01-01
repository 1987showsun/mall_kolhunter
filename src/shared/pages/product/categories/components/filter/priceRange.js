/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                    from 'react';
import queryString              from 'query-string';
import CurrencyFormat           from 'react-currency-format';

export default class PriceRange extends React.Component{

    constructor(props){
        const { pathname, search } = props.location;
        super(props);
        this.state = {
            clear: false,
            priceRange:{
                min: queryString.parse(search)['minPrice'] || 0,
                max: queryString.parse(search)['maxPrice'] || 0
            }
        }
    }

    static getDerivedStateFromProps( props,state ){

        if( props.clear == true ){
            return{
                priceRange: {
                    min: 0,
                    max: 0
                }
            }
        }
        return null;
    }

    render(){
        const { priceRange } = this.state;
        return(
            <div className="filter-unit" data-direction="column">
                <div className="filter-unit-row title">
                    <h3>價錢範圍</h3>
                </div>
                <div className="filter-unit-row">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <ul className="priceRange-ul">
                            <li>
                                <div className="input-box">
                                    <CurrencyFormat value={ priceRange['min'] } thousandSeparator={true} onValueChange={ value => this.handlePriceRange('min',value['value']) } />
                                </div>
                            </li>
                            <li>-</li>
                            <li>
                                <div className="input-box">
                                    <CurrencyFormat value={ priceRange['max'] } thousandSeparator={true} onValueChange={ value => this.handlePriceRange('max',value['value'])} />
                                </div>
                            </li>
                        </ul>
                        <button type="submit">套用價格</button>
                    </form>
                </div>
            </div>
        );
    }

    handlePriceRange = ( key,val) => {
        this.setState({
            priceRange: { ...this.state.priceRange, [key]: val }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { priceRange } = this.state;
        const { pathname, search } = this.props.location;
        const searchObject = { 
            ...queryString.parse( search ),
            maxPrice: priceRange['max'],
            minPrice: priceRange['min'],
        };
        this.props.history.push({
            pathname,
            search: queryString.stringify(searchObject)
        })
    }
}