import React from 'react';
import queryString from 'query-string';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus, faMinus }from '@fortawesome/free-solid-svg-icons';

class Item extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            itemNumMax: 10,
            formObject: {
                specToken: props.data['specToken'],
                productToken: props.data['productToken'],
                productDeliveryID: props.data['productDeliveryID'],
                storeID: props.data['storeToken'],
                itemNum: props.data['itemNum']
            }
        }
    }

    render(){

        const { data, location } = this.props;
        const { formObject } = this.state;
        const { search } = location;
        
        return(
            <figure className="product-item-figure">
                <div className="img">
                    <img src={data['image']} alt={data['productName']} title=""/>
                </div>
                <figcaption>
                    <h3> {/* ?store=${formObject['storeID']} */}
                        <Link to={`/detail/${formObject['productToken']}`} target="_blank">
                            {data['productName']}
                        </Link>
                    </h3>
                    <ul className="product-item-doc-list">
                        <li>
                            <label>尺寸 / 型號</label>
                            <div>{data['specName']}</div>
                        </li>
                        <li>
                            <label>消費網紅店家</label>
                            <div>{data['storeName'] || `Kolhunter`}</div>
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
                                    <select name="productDeliveryID" value={formObject['productDeliveryID']} onChange={this.handleChange.bind(this)}>
                                        {
                                            data['deliveryMethods'].map( item => {
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
                                <CurrencyFormat value={data['amount']} displayType={'text'} thousandSeparator={true}/>
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
            this.updateData();
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

    handleChange = ( e ) => {
        const { formObject } = this.state;
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            formObject : { ...formObject, [name]: value } 
        },()=>{
            this.updateData();
        })
    }

    actionBtn = ( method,item ) => {
        if( this.props.actionBtn!=undefined ){
            this.props.actionBtn( method,item );
        }
    }

    updateData = () => {
        if( this.props.updateData!=undefined ){
            const { formObject } = this.state;
            this.props.updateData( formObject );
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Item );