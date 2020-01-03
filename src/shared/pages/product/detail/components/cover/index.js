/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                                 from 'react';
import toaster                               from 'toasted-notes';
import queryString                           from 'query-string';
import CurrencyFormat                        from 'react-currency-format';
import { connect }                           from 'react-redux';

// Components
import Share                                 from './share';
import Price                                 from './price';
import Delivery                              from './delivery';
import Spec                                  from './spec';
import ItemNumber                            from './itemNumber';
import Store                                 from './store';
import Action                                from './action';

// Modules
import CoverSlider                           from '../../../../../module/coverSlider';

// Actions
import { updateCartProductItem, cartsCount } from '../../../../../actions/myaccount';
import { storeInfo }                         from '../../../../../actions/store';

// Set
import { main, sub }                         from '../../public/set/slider';

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
                        if( item['storage']!=0 ){
                            return true;
                        }
                    });
                    if( spec[keys][returnFindIndex]!=undefined ){
                        return spec[keys][returnFindIndex]['token'];
                    }
                    return "";
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
                        const returnFindIndex = spec[keys].findIndex((item,i) => {
                            if( item['storage']!=0 ){
                                return true;
                            }
                        });
                        if( spec[keys][returnFindIndex]!=undefined ){
                            return spec[keys][returnFindIndex]['token'];
                        }
                        return "";
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
        const { price=0, sellPrice=0, spec }      = data;
        const { specToken } = formObject;
        const itemNumMax    = Math.min(
            ...spec.map(item => {
                const findSelectedItem = item.find( findItem => specToken.includes(findItem['token']));
                return findSelectedItem!=undefined? findSelectedItem['storage']:0;
            })
        );

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
                    <div className="cover-img-wrap">
                        <CoverSlider 
                            name         = {data['name']}
                            data         = {imageData}
                            mainSettings = {main}
                            navSettings  = {sub}
                        />
                        <Share />
                    </div>
                </section>
                <section className="detail-cover-wrap-col right">
                    <div className="detail-cover-row cover-title">
                        <h1>{data['name'] || ""}</h1>
                        <ul className="cover-other-ul">
                            <li>
                                <div><span className="value"><CurrencyFormat value={data['celebrityNum']} displayType={'text'} thousandSeparator={true} /></span>店家販售</div>
                            </li>
                            {/* <li>
                                <div><span className="value"><CurrencyFormat value={itemNumMax||0} displayType={'text'} thousandSeparator={true} /></span>剩餘庫存</div>
                            </li> */}
                        </ul>
                        <Price 
                            price           = {price}
                            sellPrice       = {sellPrice}
                        />
                    </div>
                    <Delivery 
                        data            = {deliveryArray}
                        formObject      = {formObject}
                        returnSpecToken = {val => {
                            this.setState({
                                formObject: { 
                                    ...formObject, 
                                    ...val 
                                }
                            })
                        }}
                    />
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
                    <ItemNumber
                        initVal         = {1}
                        itemNumMax      = {itemNumMax || 0}
                        returnForm      = {val => {
                            console.log(val);
                            this.setState({
                                formObject: { 
                                    ...formObject,
                                    itemNumber: val['itemNum']
                                }
                            })
                        }}
                    />
                    <Store 
                        data            = {storeInfo}
                        loading         = {storeLoading}
                    />
                    <Action 
                        lock            = {lock}
                        itemNumMax      = {itemNumMax}
                        callCarts       = {this.callCarts.bind(this)}
                    />
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
        if( method!='soldOut' ){

            const { location, history } = this.props;
            const { pathname, search }  = location;
            const checkLoginStatus      = sessionStorage.getItem('jwt_account')!=null? true : false;
            const formObject            = {
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
        }else{
            alert('限量是殘酷的，就跟變了心的女友回不來了！');
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Cover );