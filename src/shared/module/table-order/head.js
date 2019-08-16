import React from 'react';

export default class Head extends React.Component{
    render(){
        return(
            <li className="order-head">
                <div>圖片</div>
                <div>商品和訂單編號</div>
                <div>數量</div>
                <div>實付金額</div>
                <div>其他</div>
            </li>
        );
    }
}