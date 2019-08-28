import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus, faMinus }from '@fortawesome/free-solid-svg-icons';

class Item extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            itemNumMax: 10,
            formObject: {
                ...props.data
            }
        }
    }

    render(){
        const { formObject } = this.state;
        const { data } = this.props;
        return(
            <figure className="product-item-figure">
                <div className="img">
                    <img src={formObject['image']} alt="" title=""/>
                </div>
                <figcaption>
                    <h3><Link to={`/detail/${formObject['productToken']}?store=${formObject['storeToken']}`} target="_blank">{data['productName']}</Link></h3>
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
                                <div className="input-box">
                                    <CurrencyFormat value={formObject['itemNum']} format={this.cardExpiry} thousandSeparator={true} onValueChange={ values => this.handleQuantity.bind(this,values)} />
                                </div>
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
                                        {
                                            formObject['deliveryMethods'].map( item => {
                                                return( <option key={item['productDeliveryID']} value={item['productDeliveryID']}>{`${item['deliveryName']} ＄${item['cost']}`}</option> );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label>小計</label>
                            <div>
                                <CurrencyFormat value={data['cartPrice']} displayType={'text'} thousandSeparator={true}/>
                            </div>
                        </li>
                    </ul>
                    <div className="action">
                        <button className="remove" onClick={this.actionBtn.bind(this,'remove',data)}>刪除</button>
                    </div>
                </figcaption>
            </figure>
        )
    }

    handleQuantity = (values) => {
        const formObject = { ...this.state.formObject, itemNum: values['value'] }
        this.setState({
            formObject
        })
    }

    quantityChange = ( method ) => {
        const { itemNumMax, formObject } = this.state;
        let itemNum = formObject['itemNum'];
        switch( method ){
            case 'minus':
                // 減
                itemNum<=1? 1 : itemNum--;
                break;

            default:
                // 加
                itemNum>=itemNumMax? itemNumMax : itemNum++;
                break;
        }

        this.setState({
            formObject : { ...formObject, itemNum } 
        },()=>{
            // 更新該商品數量 調用 API 位子
        })
    }

    cardExpiry = ( val ) =>{
        const { itemNumMax } = this.state;
        val = Number( val );
        if( val<=0 ){
            val = 1;
        }else if( val>=itemNumMax ){
            val = itemNumMax;
        } 

        return String(val);
    }

    handleChange = () => {

    }

    actionBtn = ( method,item ) => {
        if( this.props.actionBtn!=undefined ){
            this.props.actionBtn( method,item );
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Item );