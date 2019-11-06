/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React               from 'react';
import toaster             from 'toasted-notes';
import queryString         from 'query-string';
import CurrencyFormat      from 'react-currency-format';
import { connect }         from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart }  from '@fortawesome/free-solid-svg-icons';

// Components
import Share               from './share';

// Modules
import CoverSlider         from '../../../module/coverSlider';
import Quantity            from '../../../module/quantity';
import OpenSelect          from '../../../module/openSelect';
import Loading             from '../../../module/loading';

// Actions
import { updateCartProductItem, cartsCount } from '../../../actions/myaccount';
import { storeInfo }                         from '../../../actions/store';

// Set
import { main, sub }                         from '../public/set/slider';

// Lang
import lang                                  from '../../../public/lang/lang.json';

// images
import kolhunterlogo                         from '../../../public/images/kolhunter_logo.jpg';

class Cover extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            lock: false,
            data: props.data,
            storeLoading: false,
            storeInfo: {},
            formObject: {
                cartToken: "",
                productToken: props.data['token'],
                productDeliveryID: props.data['delivery'].length!=0? props.data['delivery'][0]['productDeliveryID'] : "",
                specToken: props.data['spec'].length!=0? props.data['spec'][0]['token'] : "",
                itemNumber: 1,
                storeID: ""
            },
            imageData: props.data['images'].map( item => {
                return item['path'];
            })
        }
    }

    render(){

        const { lock, data, imageData, storeLoading, storeInfo, formObject } = this.state;
        const itemNumMax = data['spec'].filter( item => item['token']==formObject['specToken']);

        // 運送方式
        const delivery = data['delivery'].map( item => {
            return{
                id         : item['productDeliveryID'],
                value      : item['productDeliveryID'],
                name       : item['name'],
                cost       : item['cost']
            }
        })

        // 型號 / 尺寸
        const spec = data['spec'].map( item => {
            return{
                id         : item['token'],
                value      : item['token'],
                name       : item['name'],
                quantity   : item['storage']
            }
        });

        const discount = ((Number(data['sellPrice'])/Number(data['price']))*10).toFixed(1);

        return(
            <div className="detail-cover-wrap">
                <div className="detail-cover-wrap-col left">
                    <CoverSlider 
                        data= {imageData}
                        mainSettings= {main}
                        navSettings= {sub}
                    />
                    <Share />
                </div>
                <div className="detail-cover-wrap-col right">
                    <div className="detail-cover-row cover-title">
                        <h1>{data['name'] || ""}</h1>
                    </div>
                    <div className="detail-cover-row cover-other">
                        <ul className="cover-other-ul">
                            <li>
                                <div><span className="value"><CurrencyFormat value={data['celebrityNum']} displayType={'text'} thousandSeparator={true} /></span>店家販售</div>
                            </li>
                            <li>
                                <div><span className="value"><CurrencyFormat value={itemNumMax[0]!=undefined? itemNumMax[0]['storage']:0} displayType={'text'} thousandSeparator={true} /></span>剩餘庫存</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-cover-row cover-money">
                        {
                            data['price']!=data['sellPrice']?(
                                <React.Fragment>
                                    <div className="cover-money-price">
                                        <CurrencyFormat value={data['price']} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </div>
                                    <div className="cover-money-sellPrice">
                                        <CurrencyFormat value={data['sellPrice']} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </div>
                                    <div className="cover-money-discount">{discount}折</div>
                                </React.Fragment>
                            ):(
                                <React.Fragment>
                                    <div className="cover-money-price"></div>
                                    <div className="cover-money-sellPrice">
                                        <CurrencyFormat value={data['sellPrice']} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </div>
                                </React.Fragment>
                            )
                        }
                    </div>
                    <div className="detail-cover-row cover-select">
                        <label>{lang['zh-TW']['label']['delivery']}</label>                            
                        <OpenSelect 
                            data= {delivery}
                            name= "productDeliveryID"
                            returnForm= { val => {
                                this.setState({
                                    formObject: { ...this.state.formObject, ...val }
                                })
                            }}
                        />
                    </div>
                    <div className="detail-cover-row cover-select">
                        <label>{lang['zh-TW']['label']['size']}</label>
                        <OpenSelect 
                            data= {spec}
                            name= "specToken"
                            returnForm= { val => {
                                this.setState({
                                    formObject: { ...this.state.formObject, ...val }
                                })
                            }}
                        />
                    </div>
                    <div className="detail-cover-row cover-quantity">
                        <label>{lang['zh-TW']['label']['buy quantity']}</label>
                        <Quantity 
                            itemNumMax= { itemNumMax[0]!=undefined? itemNumMax[0]['storage']:0  }
                            returnForm= { val => {
                                this.setState({
                                    formObject: { ...this.state.formObject, itemNumber: val['itemNum'] }
                                })
                            }}
                        />
                    </div>
                    <div className="detail-cover-row cover-select">
                        <label>{lang['zh-TW']['label']['by store']}</label>
                        <div className="detail-store-wrap">
                            <div className="img">
                                <img src={ storeInfo['photo']!=undefined? storeInfo['photo']: kolhunterlogo } alt={ storeInfo['name']!=undefined? storeInfo['name']: "網紅電商" } title="" />
                            </div>
                            <div className="name">
                                <h3 dangerouslySetInnerHTML={{__html:storeInfo['name']!=undefined? storeInfo['name']: "網紅電商"}} />
                            </div>
                            <Loading loading={storeLoading}/>
                        </div>
                    </div>
                    <div className="detail-cover-row cover-action">
                        <ul>
                            <li className="add-cart-li"><button type="button" className="add-cart" disabled={lock} onClick={this.callCarts.bind(this,"add")}>
                                <i><FontAwesomeIcon icon={faShoppingCart}/></i>
                                {lang['zh-TW']['button']['add to cart']}</button>
                            </li>
                            <li className="direct-purchase-li"><button type="button" className="direct-purchase" disabled={lock} onClick={this.callCarts.bind(this,"direct")}>{lang['zh-TW']['button']['buy now']}</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.callStoreInfoAPI();
    }

    componentDidUpdate(prevProps, prevState) {
        const { search } = this.props.location;
        const prevSearch = prevProps.location.search;
        const searchObject = queryString.parse(search);
        const prevSearchObject = queryString.parse(prevSearch);
        const store = searchObject['store'] || null;
        const prevStore = prevSearchObject['store'] || null;
        if( store!=prevStore ){
            this.callStoreInfoAPI();
        }
    }

    callStoreInfoAPI = () => {
        const { location } = this.props;
        const { pathname, search } = location;
        const searchObject = queryString.parse(search);
        const store = searchObject['store'] || null;
        if( store ){
            this.setState({
                storeLoading: true,
            },()=>{
                this.props.dispatch( storeInfo(pathname,{store: store}) ).then( res => {
                    this.setState({
                        storeLoading: false,
                    },()=>{
                        switch( res['status'] ){
                            case 200:
                                this.setState({
                                    storeInfo: res['data']
                                })
                                break;

                            default:
                                break;
                        }
                    })
                });
            })
        }
    }

    callCarts = ( method ) => {
        const { location, history } = this.props;
        const { pathname, search } = location;
        const checkLoginStatus = sessionStorage.getItem('jwt_account')!=null? true : false;
        const formObject = {
            ...this.state.formObject,
            cartToken: localStorage.getItem('cartID'),
            storeID: queryString.parse( search )['store'] || "",
        }

        if( checkLoginStatus ){
            // 登入
            this.setState({
                lock: true
            },()=>{
                this.props.dispatch( updateCartProductItem(pathname,queryString.parse(search),formObject) ).then( res => {
                    this.setState({
                        lock: false
                    },()=>{

                        let { status_text } = res['data'];
                        let status = 'failure';

                        switch( res['status'] ){
                            case 200:
                                // 加入成功
                                this.props.dispatch( cartsCount() );
                                status_text = "新增成功";
                                status      = "success";
                                switch( method ){
                                    case 'direct':
                                        this.props.history.push({
                                            pathname: '/myaccount/carts'
                                        })
                                        break;
                        
                                    default:
                                        break;
                                }
                                break;

                            default:
                                // 失敗
                                switch( method ){
                                    case 'direct':
                                        status_text = "新增失敗";
                                        if( res['data']['status_text']=='add item into shopcart failure' ){
                                            status_text = lang['zh-TW']['toaster'][res['data']['status_text']];
                                            history.push({
                                                pathname: '/myaccount/carts'
                                            })
                                        }
                                        break;

                                    default:
                                        status_text = "新增失敗";
                                        break;
                                }
                                break;
                        }

                        toaster.notify(
                            <div className={`toaster-status ${status}`}>{status_text}</div>
                        ,{
                            position: 'bottom-right',
                            duration: 3000
                        })
                    });
                });
            })
        }else{
            // 未登入
            this.props.history.push({
                pathname: '/account',
                search: 'back=true'
            })
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Cover );