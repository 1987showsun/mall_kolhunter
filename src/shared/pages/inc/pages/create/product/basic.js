import React from 'react';

export default class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: "",
            brand: "",
            original_price: 0,
            special_price: 0
        }
    }

    render(){

        const { name,brand,original_price,special_price } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>基本資料</h4>
                    </article>
                    <ul className="table-row-list">
                        <li>
                            <label>* 商品名稱：</label>
                            <div>
                                <div className="input-box">
                                    <input type="text" name="name" value={name} onChange={this.handleChange.bind(this)} />
                                </div>
                            </div>
                        </li>
                        <li>
                            <label>* 品牌名稱：</label>
                            <div>
                                <div className="input-box">
                                    <input type="text" name="brand" value={brand} onChange={this.handleChange.bind(this)} />
                                </div>
                            </div>
                        </li>
                        <li>
                            <label>* 商品分類：</label>
                            <div>4</div>
                        </li>
                        <li>
                            <label>* 原價：</label>
                            <div>
                                <div className="input-box">
                                    <input type="text" name="original_price" value={original_price} onChange={this.handleChange.bind(this)} />
                                </div>
                            </div>
                        </li>
                        <li>
                            <label>特價：</label>
                            <div>
                                <div className="input-box">
                                    <input type="text" name="special_price" value={special_price} onChange={this.handleChange.bind(this)} />
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>
            </React.Fragment>
        );
    }

    handleChange = (e) => {

    }
}