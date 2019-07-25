import React from 'react';
import CurrencyFormat from 'react-currency-format';

export default class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: props.data,
        }
    }

    static getDerivedStateFromProps(props, state) {
        return{
            data: props.data
        }
    }

    render(){

        const { data } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>基本資料</h4>
                    </article>
                    <ul className="table-row-list">
                        <li>
                            <label>商品名稱：</label>
                            <div>{data['name']}</div>
                        </li>
                        <li>
                            <label>商品分類：</label>
                            <div>
                                {/* {
                                    data['name']
                                } */}
                            </div>
                        </li>
                        <li>
                            <label>原價：</label>
                            <div>{ data['price'] }</div>
                        </li>
                        <li>
                            <label>特價：</label>
                            <div>{ data['sellPrice']!=undefined? data['sellPrice']:'N/A' }</div>
                        </li>
                    </ul>
                </section>
            </React.Fragment>
        );
    }
}