// 產品列表
import React                 from 'react';
import queryString           from 'query-string';
import { connect }           from 'react-redux';
import CurrencyFormat        from 'react-currency-format';

// Components
import Item                  from './item';

// Modules
import Loading               from '../../../../../../module/loading/mallLoading';

// Actions
import { removeCartItem, updateCartProductItem, cartsCount } from '../../../../../../actions/myaccount';

// Lang
import lang                  from '../../../../../../public/lang/lang.json';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
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
        const { loading, cartTotalAmount, list } = this.state;

        return(
            <div className="cart-product-wrap" style={{"position": "relative"}}>
                {
                    list.length!=0? (
                        list.map( item => {
                            return(
                                <Item 
                                    key= {item['addTimeMs']} 
                                    data= {item}
                                    location= {location}
                                    updateData= {this.updateData.bind(this)}
                                    actionBtn= {this.removeItems.bind(this)}
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

    updateData = ( val ) => {
        
        const cartToken = localStorage.getItem('cartID');
        const data = {
            cartToken: cartToken,
            productToken: val['productToken'],
            specToken: val['specToken'],
            itemNumber: val['itemNum'],
            storeID: val['storeID'] || "",
            productDeliveryID: val['productDeliveryID']
        }

        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( updateCartProductItem( "",{},data ) ).then( res => {
                //console.log( res );
                this.setState({
                    loading: false
                })
            });
        })
    }

    removeItems = ( method,selectedTtem ) => {
        const cartToken                 = localStorage.getItem('cartID');
        const { location }              = this.props;
        const { pathname, search }      = location;
        const { specToken, storeToken } = selectedTtem;

        this.setState({
            loading: true
        },()=>{
            switch( method ){
                case 'remove':
                    const data = { cartToken, specToken, storeToken };
                    this.props.dispatch( removeCartItem( pathname, queryString.parse(search), data ) ).then( res => {
                        this.setState({
                            loading: false
                        },()=>{
                            switch( res['status'] ){
                                case 200:
                                    this.props.dispatch( cartsCount() );
                                    break;

                                default:
                                    break;
                            }
                        })
                    });
                    break;
            }
        });
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