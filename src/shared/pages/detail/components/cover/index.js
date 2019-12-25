/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                                 from 'react';
import toaster                               from 'toasted-notes';
import queryString                           from 'query-string';
import CurrencyFormat                        from 'react-currency-format';
import { connect }                           from 'react-redux';
import { FontAwesomeIcon }                   from '@fortawesome/react-fontawesome';
import { faShoppingCart }                    from '@fortawesome/free-solid-svg-icons';

// Components
import Share                                 from './share';
import Price                                 from './price';
import Spec                                  from './spec';

// Modules
import CoverSlider                           from '../../../../module/coverSlider';
import Quantity                              from '../../../../module/quantity';
import OpenSelect                            from '../../../../module/openSelect';
import Loading                               from '../../../../module/loading';

// Actions
import { updateCartProductItem, cartsCount } from '../../../../actions/myaccount';
import { storeInfo }                         from '../../../../actions/store';

// Set
import { main, sub }                         from '../../public/set/slider';

// Lang
import lang                                  from '../../../../public/lang/lang.json';

// images
import kolhunterlogo                         from '../../../../public/images/kolhunter_logo.jpg';

class Cover extends React.Component{

    constructor(props){
        super(props);

        const { data } = props;
        const { delivery, spec, images } = data;
        const productDeliveryID  = delivery.length!=0?   delivery[0]['productDeliveryID'] : "";

        this.state = {
            lock                   : false,
            storeLoading           : false,
            storeInfo              : {},
            data                   : data,
            imageData              : images.map( item => item['path'] ),
            formObject             : {
                cartToken            : "",
                productToken         : data['token'],
                productDeliveryID    : productDeliveryID,
                specToken            : Object.keys(spec).map(keys => {
                    const returnFindIndex = spec[keys].findIndex((item,i) => {
                        if( item['storage']==0 ){
                            return i+1;
                        }
                    });
                    return spec[keys][returnFindIndex+1]['token'];
                }),
                itemNumber           : 1,
                storeID              : ""
            },
        }
    }

    static getDerivedStateFromProps( props,state ){
        const stateData = state['data'];
        const propsData = props['data'];
        if( String(stateData['token'])!=String(propsData['token']) ){
            const { delivery, spec, images } = propsData;
            const productDeliveryID  = delivery.length!=0?   delivery[0]['productDeliveryID'] : "";
            return{
                data                   : propsData,
                imageData              : images.map( item => item['path'] ),
                formObject             : {
                    cartToken            : "",
                    productToken         : propsData['token'],
                    productDeliveryID    : productDeliveryID,
                    specToken            : Object.keys(spec).map(keys => {
                        const returnFindIndex = spec[keys].findIndex((item,i,array) => {
                            if( item['storage']==0 ){
                                return i+1;
                            }
                        });
                        return spec[keys][returnFindIndex+1]['token'];
                    }),
                    itemNumber           : 1,
                    storeID              : ""
                }
            }
        }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState){
        const { data, formObject } = this.state;
        const nextData             = nextState.data;
        const nextFormObject       = nextState.formObject;
        if( String(data['token'])!=String(nextData['token']) ){
            return true;
        }

        if( formObject['specToken'].some( (item,i) => item==nextFormObject['specToken'][i] ) ){
            return true;
        }

        return false;
    }

    render(){

        const { lock, data, imageData, storeLoading, storeInfo, formObject } = this.state;
        const { spec }       = data;
        const { specToken }  = formObject;

        const itemNumMax     =  spec[0].find( item => {
            if( item['token'] == specToken[0] ){
                return item;
            }
        })['storage'];

        // 運送方式
        const deliveryArray = data['delivery'].map( item => {
            return{
                id         : item['productDeliveryID'],
                value      : item['productDeliveryID'],
                name       : item['name'],
                cost       : item['cost']
            }
        })

        return(
            <section className="detail-cover-wrap">
                <section className="detail-cover-wrap-col left">
                    <CoverSlider 
                        name         = {data['name']}
                        data         = {imageData}
                        mainSettings = {main}
                        navSettings  = {sub}
                    />
                    <Share />
                </section>
                <section className="detail-cover-wrap-col right">
                    <div className="detail-cover-row cover-title">
                        <h1>{data['name'] || ""}</h1>
                    </div>
                    <div className="detail-cover-row cover-other">
                        <ul className="cover-other-ul">
                            <li>
                                <div><span className="value"><CurrencyFormat value={data['celebrityNum']} displayType={'text'} thousandSeparator={true} /></span>店家販售</div>
                            </li>
                            {/* <li>
                                <div><span className="value"><CurrencyFormat value={itemNumMax||0} displayType={'text'} thousandSeparator={true} /></span>剩餘庫存</div>
                            </li> */}
                        </ul>
                    </div>
                    <Price 
                        data= { data }
                    />
                    <div className="detail-cover-row cover-select">
                        <label>{lang['zh-TW']['label']['delivery']}</label>                            
                        <OpenSelect 
                            data         = {deliveryArray}
                            name         = "productDeliveryID"
                            initSelected = {formObject['productDeliveryID']}
                            returnForm   = { val => {
                                this.setState({
                                    formObject: { ...this.state.formObject, ...val }
                                })
                            }}
                        />
                    </div>
                    <Spec
                        data            = {data}
                        formObject      = {formObject}
                        returnSpecToken = {val => {
                            this.setState({
                                formObject: {
                                    ...formObject,
                                    val
                                }
                            })
                        }}
                    />
                    <div className="detail-cover-row cover-quantity">
                        <label>{lang['zh-TW']['label']['buy quantity']}</label>
                        <Quantity
                            initVal   = {1}
                            itemNumMax= { itemNumMax||0 }
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
                            <li className="add-cart-li">
                                <button type="button" className="add-cart" disabled={lock} onClick={this.callCarts.bind(this,"add")}>
                                    <i><FontAwesomeIcon icon={faShoppingCart}/></i>
                                    {lang['zh-TW']['button']['add to cart']}
                                </button>
                            </li>
                            <li className="direct-purchase-li">
                                <button type="button" className="direct-purchase" disabled={lock} onClick={this.callCarts.bind(this,"direct")}>
                                    {lang['zh-TW']['button']['buy now']}
                                </button>
                            </li>
                        </ul>
                    </div>
                </section>
            </section>
        );
    }

    componentDidMount() {
        this.callStoreInfoAPI();
    }

    componentDidUpdate(prevProps, prevState) {
        const { search }          = this.props.location;
        const prevSearch          = prevProps.location.search;
        const searchObject        = queryString.parse(search);
        const prevSearchObject    = queryString.parse(prevSearch);
        const store               = searchObject['store'] || null;
        const prevStore           = prevSearchObject['store'] || null;
        if( store!=prevStore ){
            this.callStoreInfoAPI();
        }
    }

    callStoreInfoAPI = () => {
        const { location }         = this.props;
        const { pathname, search } = location;
        const searchObject         = queryString.parse(search);
        const store                = searchObject['store'] || null;
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
        const { pathname, search }  = location;
        const checkLoginStatus      = sessionStorage.getItem('jwt_account')!=null? true : false;
        const formObject = {
            ...this.state.formObject,
            cartToken   : localStorage.getItem('cartID'),
            storeID     : queryString.parse( search )['store'] || "",
        }

        this.setState({
            lock: true
        },()=>{
            this.props.dispatch( updateCartProductItem(pathname,queryString.parse(search),formObject) ).then( res => {
                this.setState({
                    lock: false
                },()=>{

                    let { status_text } = res['data'];
                    let status          = 'failure';

                    switch( res['status'] ){
                        case 200:
                            // 加入成功
                            this.props.dispatch( cartsCount() );
                            status_text = "新增成功";
                            status      = "success";
                            switch( method ){
                                case 'direct':
                                    // 直接購買
                                    if( checkLoginStatus ){
                                        // 登入
                                        history.push({
                                            pathname   : '/myaccount/carts'
                                        });
                                    }else{
                                        // 未登入
                                        history.push({
                                            pathname   : '/account',
                                            search     : 'to=carts'
                                        });
                                    }
                                    break;
                    
                                default:
                                    break;
                            }
                            break;

                        default:
                            // 失敗
                            status_text = "新增失敗";
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
        });
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Cover );