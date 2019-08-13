import React from 'react';
import queryString from 'query-string';
import CurrencyFormat from 'react-currency-format';

export default class PriceRange extends React.Component{

    constructor(props){
        const { pathname, search } = props.location;


        super(props);
        this.state = {
            priceRange:{
                min: queryString.parse(search)['priceMin'] || 0,
                max: queryString.parse(search)['priceMax'] || 0
            }
        }
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
            priceMax: priceRange['max'],
            priceMin: priceRange['min'],
        };
        this.props.history.push({
            pathname,
            search: queryString.stringify(searchObject)
        })
    }
}