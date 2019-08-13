import React from 'react';
import { connect } from 'react-redux';

import Item from './item';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
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
                    "addTimeMs": 1565687018438
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
                    "addTimeMs": 1565687018438
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
                    "addTimeMs": 1565687018438
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
                    "addTimeMs": 1565687018438
                }
            ]
        }
    }

    render(){

        const { list } = this.state;
        console.log( list );

        return(
            <div className="cart-product-wrap">
                {
                    list.map( (items,i) => {
                        return(
                            <Item key={i} data={items} />
                        )
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );