import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus, faMinus }from '@fortawesome/free-solid-svg-icons';

// Components
import Img from './img';

export default class Cover extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                variant: "太空灰",
                quantity: 1
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <div className="detail-cover-wrap">
                <div className="detail-cover-wrap-col left">
                    <Img />
                </div>
                <div className="detail-cover-wrap-col right">
                    <div className="detail-cover-row cover-title">
                        <h1>Apple IPhone XS Max 64GB 太空灰/銀/金 6.5吋 原廠保固 蝦皮24h 現貨</h1>
                    </div>
                    <div className="detail-cover-row cover-other">
                        <ul className="cover-other-ul">
                            <li>
                                <label>販賣店家家數</label>
                                <div>12</div>
                            </li>
                            <li>
                                <label>已售數量</label>
                                <div>12</div>
                            </li>
                            <li>
                                <label>庫存數量</label>
                                <div>12</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-cover-row cover-money">
                        <div className="cover-money-price">39,900</div>
                        <div className="cover-money-sellPrice">36,988</div>
                    </div>
                    <div className="detail-cover-row cover-delivery">
                        <label>運送方式</label>
                        <ul className="delivery-list">
                            <li>7-11 黑貓宅急便</li>
                            <li>全家 宅配通</li>
                            <li>萊爾富</li>
                        </ul>
                    </div>
                    <div className="detail-cover-row cover-select">
                        <label>型號 / 尺寸 / 顏色</label>
                        <ul className="select-list">
                            <li>
                                <label htmlFor="radio1">
                                    <input type="radio" name="variant" id="radio1" className="variant" value="太空灰" onChange={this.handleChange.bind(this)} checked={formObject['variant']=="太空灰"} />
                                    <span>太空灰</span>
                                </label>
                            </li>
                            <li>
                                <label htmlFor="radio2">
                                    <input type="radio" name="variant" id="radio2" className="variant" value="銀色" onChange={this.handleChange.bind(this)} checked={formObject['variant']=="銀色"}/>
                                    <span>銀色</span>
                                </label>
                            </li>
                            <li>
                                <label htmlFor="radio3">
                                    <input type="radio" name="variant" id="radio3" className="variant" value="金色" onChange={this.handleChange.bind(this)} checked={formObject['variant']=="金色"}/>
                                    <span>金色</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-cover-row cover-quantity">
                        <label>數量</label>
                        <div className="quantity-wrap">
                            <button type="button" onClick={this.quantityChange.bind(this,"minus")}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <input type="member" name="quantity" value={formObject['quantity']} onChange={this.handleChange.bind(this)} /> 
                            <button type="button" onClick={this.quantityChange.bind(this,"plus")}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                    <div className="detail-cover-row cover-quantity">
                        <label>購買店家</label>
                        <div>asasasas</div>
                    </div>
                    <div className="detail-cover-row cover-action">
                        <ul>
                            <li className="add-cart-li"><button type="button" className="add-cart">加入購物車</button></li>
                            <li className="direct-purchase-li"><button type="button" className="direct-purchase">直接購買</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    handleChange = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        let formObject = { ...this.state.formObject, [name]: val }
        if( name=="quantity" ){
            let nu = parseInt(val);
            if( isNaN(nu) || nu<=0 ){
                nu = 1;
            }
            formObject = { ...this.state.formObject, [name]: nu }
        }
        this.setState({
            formObject
        })
    }

    quantityChange = ( action ) => {
        
        let { formObject } = this.state;
        let nu = Number(formObject['quantity']);

        switch( action ){
            case "plus":
                nu++;
                break;

            case "minus":
                nu--;
                if( nu<=0 ){
                    nu = 1;
                }
                break;
        }

        formObject = { ...formObject, quantity: nu }

        this.setState({
            formObject
        })
    }
}