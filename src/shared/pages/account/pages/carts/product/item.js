import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus, faMinus }from '@fortawesome/free-solid-svg-icons';

class Item extends React.Component{
    render(){
        const { data } = this.props;
        return(
            <figure className="product-item-figure">
                <div className="img">
                    <img src={data['image']} alt="" title=""/>
                </div>
                <figcaption>
                    <h3>{data['productName']}</h3>
                    <ul className="product-item-doc-list">
                        <li>
                            <label>尺寸 / 型號</label>
                            <div>{data['specName']}</div>
                        </li>
                        <li>
                            <label>消費網紅店家</label>
                            <div>{data['storeName']}</div>
                        </li>
                        <li>
                            <label>數量</label>
                            <div className="quantity-wrap">
                                <button type="button" onClick={this.quantityChange.bind(this,"minus")}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <input type="member" name="quantity" value="1" onChange={this.handleChange.bind(this)} /> 
                                <button type="button" onClick={this.quantityChange.bind(this,"plus")}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </li>
                        <li>
                            <label>運送方式</label>
                            <div>
                                <div className="input-box select">
                                    <select>
                                        <option>7-11</option>
                                    </select>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label>小計</label>
                            <div>{data['cartPrice']}</div>
                        </li>
                    </ul>

                    <div className="action"></div>
                </figcaption>
            </figure>
        )
    }

    quantityChange = () => {

    }

    handleChange = () => {

    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Item );