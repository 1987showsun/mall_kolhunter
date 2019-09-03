// 產品列表
import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

// Components
import Item from './item';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            cartTotalAmount: props.amount,
            list : props.data
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            cartTotalAmount: props.amount,
            list: props.data
        }
    }

    render(){

        const { location } = this.props;
        const { cartTotalAmount, list } = this.state;

        return(
            <div className="cart-product-wrap">
                {
                    list.map( item => {
                        return(
                            <Item 
                                key= {item['id']} 
                                data= {item}
                                location= {location}
                            />
                        )
                    })
                }
                <div className="total-wrap">
                    <span className="label">購買總金額：</span>
                    <CurrencyFormat className="total-money" value={cartTotalAmount} displayType={'text'} thousandSeparator={true}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
    }
}

export default connect( mapStateToProps )( Index );