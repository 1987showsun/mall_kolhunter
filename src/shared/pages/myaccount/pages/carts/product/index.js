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
            list : [
                {
                    "storeToken": "storeid-00000001",
                    "storeName": "蔡阿嘎",
                    "productName": "ASUS X507UB 15吋窄邊框筆電 (i5-8250U/MX110 2G獨顯/1TB",
                    "productToken": "productid-000000001",
                    "specName": "黑色/F",
                    "specToken": "specid-0000000001",
                    "image": "https://s.yimg.com/wp/api/res/1.2/uB9e.wEIYBtgQif1fxPLQA--~A/YXBwaWQ9dHdzcG1hbGw7Zmk9Zml0O2g9MjUwO3NzPTAuNzt3PTI1MA--/https://s.yimg.com/zp/MerchandiseImages/1D223A82B8-Gd-8374219.jpg",
                    "itemNum": 1,
                    "cartPrice": 19800,
                    "actualPrice": 19800,
                    "addTimeMs": 1565687018431,
                    "productDeliveryID": "delivery0001",
                    "deliveryMethods": [
                        {
                            "productDeliveryID": "delivery0001",
                            "deliveryName": "7-11",
                            "cost": 300
                        },
                        {
                            "productDeliveryID": "delivery0002",
                            "deliveryName": "全家",
                            "cost": 100
                        }
                    ]
                },
                {
                    "storeToken": "storeid-00000002",
                    "storeName": "蔡阿嘎",
                    "productName": "ASUS X507UB 15吋窄邊框筆電 (i5-8250U/MX110 2G獨顯/1TB",
                    "productToken": "productid-000000002",
                    "specName": "黑色/F",
                    "specToken": "specid-0000000002",
                    "image": "https://s.yimg.com/wp/api/res/1.2/uB9e.wEIYBtgQif1fxPLQA--~A/YXBwaWQ9dHdzcG1hbGw7Zmk9Zml0O2g9MjUwO3NzPTAuNzt3PTI1MA--/https://s.yimg.com/zp/MerchandiseImages/1D223A82B8-Gd-8374219.jpg",
                    "itemNum": 1,
                    "cartPrice": 19800,
                    "actualPrice": 19800,
                    "addTimeMs": 1565687018432,
                    "productDeliveryID": "delivery0002",
                    "deliveryMethods": [
                        {
                            "productDeliveryID": "delivery0001",
                            "deliveryName": "7-11",
                            "cost": 300
                        },
                        {
                            "productDeliveryID": "delivery0002",
                            "deliveryName": "全家",
                            "cost": 100
                        }
                    ]
                },
                {
                    "storeToken": "storeid-00000003",
                    "storeName": "蔡阿嘎",
                    "productName": "ASUS X507UB 15吋窄邊框筆電 (i5-8250U/MX110 2G獨顯/1TB",
                    "productToken": "productid-000000003",
                    "specName": "黑色/F",
                    "specToken": "specid-0000000003",
                    "image": "https://s.yimg.com/wp/api/res/1.2/uB9e.wEIYBtgQif1fxPLQA--~A/YXBwaWQ9dHdzcG1hbGw7Zmk9Zml0O2g9MjUwO3NzPTAuNzt3PTI1MA--/https://s.yimg.com/zp/MerchandiseImages/1D223A82B8-Gd-8374219.jpg",
                    "itemNum": 1,
                    "cartPrice": 19800,
                    "actualPrice": 19800,
                    "addTimeMs": 1565687018433,
                    "productDeliveryID": "delivery0002",
                    "deliveryMethods": [
                        {
                            "productDeliveryID": "delivery0001",
                            "deliveryName": "7-11",
                            "cost": 300
                        },
                        {
                            "productDeliveryID": "delivery0002",
                            "deliveryName": "全家",
                            "cost": 100
                        }
                    ]
                },
                {
                    "storeToken": "storeid-00000004",
                    "storeName": "蔡阿嘎",
                    "productName": "ASUS X507UB 15吋窄邊框筆電 (i5-8250U/MX110 2G獨顯/1TB",
                    "productToken": "productid-000000004",
                    "specName": "黑色/F",
                    "specToken": "specid-0000000004",
                    "image": "https://s.yimg.com/wp/api/res/1.2/uB9e.wEIYBtgQif1fxPLQA--~A/YXBwaWQ9dHdzcG1hbGw7Zmk9Zml0O2g9MjUwO3NzPTAuNzt3PTI1MA--/https://s.yimg.com/zp/MerchandiseImages/1D223A82B8-Gd-8374219.jpg",
                    "itemNum": 1,
                    "cartPrice": 19800,
                    "actualPrice": 19800,
                    "addTimeMs": 1565687018434,
                    "productDeliveryID": "delivery0001",
                    "deliveryMethods": [
                        {
                            "productDeliveryID": "delivery0001",
                            "deliveryName": "7-11",
                            "cost": 300
                        }
                    ]
                }
            ]
        }
    }

    static getDerivedStateFormProps( props,state ){

        if( props.cartToken!=state.cartToken ){
            return{
                cartToken: props.cartToken
            }
        }

        if( props.list!=state.list ){
            return{

            }
        }

        return null;
    }

    render(){

        const { list } = this.state;

        return(
            <div className="cart-product-wrap">
                {
                    list.map( item => {
                        return(
                            <Item 
                                key= {item['addTimeMs']} 
                                data= {item}
                                updateData= {this.updateData.bind(this)}
                                actionBtn= {this.actionBtn.bind(this)}
                            />
                        )
                    })
                }
                <div className="total-wrap">
                    <span className="label">購買總金額：</span>
                    <CurrencyFormat className="total-money" value="11,222" displayType={'text'} thousandSeparator={true}/>
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
        list: state.myaccount.cartItems
    }
}

export default connect( mapStateToProps )( Index );