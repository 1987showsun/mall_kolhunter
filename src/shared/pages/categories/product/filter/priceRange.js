import React from 'react';
import CurrencyFormat from 'react-currency-format';

export default class PriceRange extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            priceRange:{
                min: 0,
                max: 0
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
                    <form>
                        <ul className="priceRange-ul">
                            <li>
                                <div className="input-box">
                                    <CurrencyFormat value={ priceRange['min'] } thousandSeparator={true} prefix={'$'} onValueChange={ this.handlePriceRange.bind(this) } />
                                </div>
                            </li>
                            <li>-</li>
                            <li>
                                <div className="input-box">
                                    <CurrencyFormat value={ priceRange['max'] } thousandSeparator={true} prefix={'$'} onValueChange={this.handlePriceRange.bind(this)} />
                                </div>
                            </li>
                        </ul>
                        <button type="submit">套用價格</button>
                    </form>
                </div>
            </div>
        );
    }

    handlePriceRange = (val) => {
        console.log(val);
    }
}