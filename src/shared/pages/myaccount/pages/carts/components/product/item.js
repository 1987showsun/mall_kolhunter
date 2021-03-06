/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                                 from 'react';
import queryString                           from 'query-string';
import CurrencyFormat                        from 'react-currency-format';
import { Link }                              from 'react-router-dom';
import { connect }                           from 'react-redux';
import { FontAwesomeIcon }                   from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faArrowCircleRight }                   from '@fortawesome/free-solid-svg-icons';

// Modules
import Quantity                              from '../../../../../../module/quantity';

class Item extends React.Component{

    constructor(props){
        super(props);

        const { spec, productToken, productDeliveryID, storeToken, itemCode, itemNum }  = props.data;

        let specToken = [];
        spec.map(item => {
            let expectedSpecCount = item['itemNum']/itemNum;
            [...Array(item['itemNum'])].map((_, i) => {
                specToken.push(item['specToken']);
            });
        });

        this.state = {
            itemNumMax           : 10,
            formObject           : {
                specToken          : specToken,
                productToken       : productToken,
                itemCode           : itemCode,
                productDeliveryID  : productDeliveryID,
                storeID            : storeToken,
                itemNum            : itemNum
            }
        }
    }

    static getDerivedStateFromProps( props,state ){

        const { formObject, itemNumMax } = state;
        const { itemNum }    = props.data;
        return{
            formObject       : {
                ...formObject,
                itemNum        : itemNum
            }
        }
    }

    render(){

        const { data }           = this.props;
        const { formObject, itemNumMax }     = this.state;
        const { spec, isCombo }  = data;
        return(
            <div className="cart-product-items">
                <figure className="product-item-figure">
                    <div className="img">
                        <img src={data['image']} alt={data['productName']} title=""/>
                    </div>
                    <figcaption>
                        <h3>
                            <Link to={`/detail/${formObject['productToken']}`} target="_blank">
                                {data['productName']}
                            </Link>
                        </h3>
                        <ul className="product-item-doc-list">
                            <li>
                                <label>??????</label>
                                <Quantity 
                                    initVal     = { formObject['itemNum'] }
                                    itemNumMax  = { itemNumMax || 0 }
                                    returnForm  = { this.updateData.bind(this) }
                                />
                            </li>
                            <li>
                                <label>??????????????????</label>
                                {
                                    data['storeToken']==""?(
                                        <div>Kolhunter</div>
                                    ):(
                                        <div><Link to={`/store/${data['storeToken']}`} target="_blank">{data['storeName']}</Link></div>
                                    )
                                }
                            </li>
                            <li>
                                <label>?????? / ??????</label>
                                <div>
                                    {
                                        spec.length>=2? (
                                            "????????????"
                                        ):(
                                            spec.length>0? spec[0]['specName'] : ''
                                        )
                                    }
                                </div>
                            </li>
                            {/* <li>
                                <label>????????????</label>
                                <div>
                                    <div className="input-box select">
                                        <select name="productDeliveryID" value={formObject['productDeliveryID']} onChange={this.handleChange.bind(this)}>
                                            {
                                                data['deliveryMethods'].map( item => {
                                                    return(<option key={item['productDeliveryID']} value={item['productDeliveryID']}>{`${item['deliveryName']} ???${item['cost']}`}</option>);
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </li> */}
                            <li>
                                <label>??????</label>
                                <div>
                                    <CurrencyFormat value={data['amount']} displayType={'text'} thousandSeparator={true}/>
                                </div>
                            </li>
                        </ul>
                        <div className="action">
                            <button className="remove" onClick={this.actionBtn.bind(this,'remove',data)}>??????</button>
                        </div>
                    </figcaption>
                </figure>
                {
                    isCombo? (
                        <div className="subproject-wrap">
                            <div className="subproject-head">
                                <i><FontAwesomeIcon icon={faArrowCircleRight}/></i>
                                <h3>??????????????????</h3>
                            </div>
                            {
                                spec.map((item,i) => {
                                    return(
                                        <div key={item['specToken']} className="subproject-items">
                                            <div className="sort">
                                                {String(i+1).length<2? (`0${i+1}`):(i+1)}
                                            </div>
                                            <div className="name">
                                                <p>{item['productName']}</p>
                                            </div>
                                            <div className="spec">
                                                <p>{item['itemNum']} x {item['specName'] || ''}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ):(
                        null
                    )
                }
            </div>
        )
    }

    handleChange = ( e ) => {
        const { formObject }  = this.state;
        const { name, value } = e.target;
        this.setState({
            formObject: { 
                ...formObject,
                [name]: value 
            }
        },()=>{
            this.updateData();
        })
    }

    actionBtn = ( method,item ) => {
        if( this.props.actionBtn!=undefined ){
            this.props.actionBtn( method,item );
        }
    }

    updateData = (val) => {
        if( this.props.updateData!=undefined ){
            const { formObject, itemNumMax } = this.state;
            const { data } = this.props;
            this.props.updateData({...formObject, itemNum: val['itemNum']});
            if (data['isCombo']) {
                data['spec'].map(s=>{
                    if (val['itemNum'] * s['itemNum'] > s['storage']) {
                        this.setState({
                            itemNumMax: formObject['itemNum']
                        })
                    }
                })
            } else {
                data['spec'].map(s=>{
                    if (val['itemNum'] > s['storage']) {
                        this.setState({
                            itemNumMax: formObject['itemNum']
                        })
                    }
                })
            }
            
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Item );