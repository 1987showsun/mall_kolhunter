import React from 'react';
import toaster from 'toasted-notes';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Modules
import CoverSlider from '../../module/coverSlider';
import Quantity from '../../module/quantity';
import OpenSelect from '../../module/openSelect';

// Actions
import { updateCartProductItem } from '../../actions/myaccount';

// Set
import { main, sub } from './public/set/slider';

// Lang
import lang from '../../public/lang/lang.json';

class Cover extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: props.data,
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

        const { data, imageData, formObject } = this.state;
        const itemNumMax = data['spec'].filter( item => item['token']==formObject['specToken']);
        const delivery = data['delivery'].map( item => {
            return{
                id: item['productDeliveryID'],
                value: item['productDeliveryID'],
                name: item['name'],
            }
        })
        const spec = data['spec'].map( item => {
            return{
                id: item['token'],
                value: item['token'],
                name: item['name'],
                quantity: item['storage']
            }
        })

        return(
            <div className="detail-cover-wrap">
                <div className="detail-cover-wrap-col left">
                    <CoverSlider 
                        data= {imageData}
                        mainSettings= {main}
                        navSettings= {sub}
                    />
                </div>
                <div className="detail-cover-wrap-col right">
                    <div className="detail-cover-row cover-title">
                        <h1>{data['name'] || ""}</h1>
                    </div>
                    <div className="detail-cover-row cover-other">
                        <ul className="cover-other-ul">
                            <li>
                                <label>販賣店家家數</label>
                                <div>{data['celebrityNum']}</div>
                            </li>
                            <li>
                                <label>已售數量</label>
                                <div>12</div>
                            </li>
                            <li>
                                <label>庫存數量</label>
                                <div>{itemNumMax[0]!=undefined? itemNumMax[0]['storage']:0}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-cover-row cover-money">
                        <div className="cover-money-price">{data['price']}</div>
                        <div className="cover-money-sellPrice">{data['sellPrice']}</div>
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
                    <div className="detail-cover-row cover-quantity">
                        <label>{lang['zh-TW']['label']['by store']}</label>
                        <div>
                            <div className="detail-store-wrap">
                                <div className="img">
                                    <img src="https://static.kolhunter.com/kol/cyberImg-1429.jpg" alt="蔡阿嘎" title="" />
                                </div>
                                <div className="name">
                                    <h3>蔡阿嘎</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-cover-row cover-action">
                        <ul>
                            <li className="add-cart-li"><button type="button" className="add-cart" onClick={this.callCarts.bind(this,"add")}>{lang['zh-TW']['button']['add to cart']}</button></li>
                            <li className="direct-purchase-li"><button type="button" className="direct-purchase" onClick={this.callCarts.bind(this,"direct")}>{lang['zh-TW']['button']['buy now']}</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    callCarts = ( method ) => {
        const { location } = this.props;
        const { pathname,search } = location;
        const checkLoginStatus = sessionStorage.getItem('jwt_account')!=null? true : false;
        const formObject = {
            ...this.state.formObject,
            cartToken: localStorage.getItem('cartID'),
            storeID: queryString.parse( search )['storeID'] || "",
        }

        if( checkLoginStatus ){
            // 登入
            this.props.dispatch( updateCartProductItem(pathname,search,formObject) ).then( res => {
                switch( res['status'] ){
                    case 200:
                        // 加入成功
                        switch( method ){
                            case 'direct':
                                console.log( '直購' );
                                this.props.history.push({
                                    pathname: '/myaccount/carts'
                                })
                                break;
                
                            case 'add':
                                console.log( '新增' );
                                toaster.notify(
                                    <div className={`toaster-status success`}>新增成功</div>
                                ,{
                                    position: 'bottom-right',
                                    duration: 5000
                                })
                                break;
                        }
                        break;

                    default:
                        // 失敗
                        
                        break;
                }
            });
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