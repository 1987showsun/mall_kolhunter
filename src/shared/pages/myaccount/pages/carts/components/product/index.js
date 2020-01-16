/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

// 產品列表
import React                                 from 'react';
import toaster                               from 'toasted-notes';
import queryString                           from 'query-string';
import { connect }                           from 'react-redux';
import CurrencyFormat                        from 'react-currency-format';

// Components
import Item                                  from './item';

// Modules
import Loading                               from '../../../../../../module/loading/mallLoading';

// Actions
import { removeCartItem, cartsProductList, updateCartProductItem, cartsCount } from '../../../../../../actions/myaccount';

// Lang
import lang                                  from '../../../../../../public/lang/lang.json';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading            : false,
            cartToken          : props.cartToken,
            cartTotalAmount    : 0,
            list               : []
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            cartToken          : props.cartToken,
            cartTotalAmount    : props.cartTotalAmount,
            list               : props.list
        }
    }

    render(){

        const { location } = this.props;
        const { loading, cartTotalAmount, list } = this.state;

        return(
            <div className="cart-product-wrap" style={{"position": "relative"}}>
                {
                    list.length!=0? (
                        list.map( item => {
                            return(
                                <Item 
                                    key           = {item['itemCode']} 
                                    data          = {item}
                                    location      = {location}
                                    updateData    = {this.updateData.bind(this)}
                                    actionBtn     = {this.removeItems.bind(this)}
                                />
                            )
                        })
                    ):(
                        <div className="list-nodata">{lang['zh-TW']['no product']}</div>
                    )
                }
                <div className="total-wrap">
                    <span className="label">購買總金額：</span>
                    <CurrencyFormat className="total-money" value={cartTotalAmount} displayType={'text'} thousandSeparator={true}/>
                </div>
                <Loading loading={loading} />
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( cartsProductList() ).then( res => {
                this.setState({
                    loading: false
                });
            });
        });
    }

    updateData = ( val ) => {

        const { productToken, specToken, itemCode, itemNum, storeID="", productDeliveryID, isCombo } = val;
        const data = {
            cartToken           : localStorage.getItem('cartID'),
            productToken,
            specToken,
            itemCode            : itemCode,
            storeID,
            productDeliveryID,
            itemNumber          : val['itemNum'],
        }
        
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( updateCartProductItem( "",{},data ) ).then( res => {
                this.setState({
                    loading: false
                })
            });
        });

    }

    removeItems = ( method,selectedTtem ) => {
        const cartToken                       = localStorage.getItem('cartID');
        const { location }                    = this.props;
        const { pathname, search }            = location;
        const { itemCode=null, storeToken }   = selectedTtem;
        let   status                          = 'failure';
        let   status_text                     = lang['zh-TW']['note']['failed to delete'];

        this.setState({
            loading: true
        },()=>{
            switch( method ){
                case 'remove':
                    const data     = { 
                        cartToken, 
                        storeToken,
                        itemCode     : itemCode!=null? [itemCode] : itemCode
                    };
                    this.props.dispatch( removeCartItem( pathname, queryString.parse(search), data ) ).then( res => {
                        this.setState({
                            loading: false
                        },()=>{
                            switch( res['status'] ){
                                case 200:
                                    status      = "success";
                                    status_text = lang['zh-TW']['note']['successfully deleted'];
                                    this.props.dispatch( cartsCount() );
                                    break;
                            }
                            toaster.notify(
                                <div className={`toaster-status ${status}`}>{status_text}</div>
                            ,{
                                position: 'bottom-right',
                                duration: 3000
                            })
                        })
                    });
                    break;
            }
        });
    }
}

const mapStateToProps = state => {
    return{
        cartToken          : state.myaccount.cartToken,
        cartTotalAmount    : state.myaccount.cartTotalAmount,
        list               : state.myaccount.cartItems
    }
}

export default connect( mapStateToProps )( Index );