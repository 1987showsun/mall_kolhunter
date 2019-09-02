// 產品列表
import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

// Components
import Item from './item';

// Actions
import { removeCartItem, updateCartProductItem } from '../../../../../actions/myaccount';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            cartToken: props.cartToken,
            cartTotalAmount: 0,
            list : []
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            cartToken: props.cartToken,
            cartTotalAmount: props.cartTotalAmount,
            list: props.list
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
                                key= {item['addTimeMs']} 
                                data= {item}
                                location= {location}
                                updateData= {this.updateData.bind(this)}
                                actionBtn= {this.actionBtn.bind(this)}
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

    updateData = ( val ) => {
        
        const cartToken = localStorage.getItem('cartID');
        const data = {
            cartToken: cartToken,
            productToken: val['productToken'],
            specToken: val['specToken'],
            itemNumber: val['itemNum'],
            storeID: val['storeToken'],
            productDeliveryID: val['productDeliveryID']
        }

        this.props.dispatch( updateCartProductItem( "",{},data ) ).then( res => {
            console.log( res );
        });
    }

    actionBtn = ( method,selectedTtem ) => {
        const cartToken = localStorage.getItem('cartID');
        const { location } = this.props;
        const { pathname, search } = location;
        switch( method ){
            case 'remove':
                const data = { cartToken: cartToken, specToken: selectedTtem['specToken'] };
                this.props.dispatch( removeCartItem( pathname, queryString.parse(search), data ) );
                break;
        }
    }
}

const mapStateToProps = state => {
    return{
        cartToken: state.myaccount.cartToken,
        cartTotalAmount: state.myaccount.cartTotalAmount,
        list: state.myaccount.cartItems
    }
}

export default connect( mapStateToProps )( Index );