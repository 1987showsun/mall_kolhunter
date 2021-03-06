/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import axios from 'axios';
import queryString from 'query-string';
import API from './apiurl';

// 會員資訊
export function ainfo(){
    return(dispatch) => {
        if( typeof window !== 'undefined' ){
            const method = 'get';
            const url = API()['myaccount']['info'];
            const token = sessionStorage.getItem('jwt_account');
            if( token!=null && token!=undefined && token!="" ){
                // 檢查有無 jwt account token 有代表已登入 
                return Axios({ method,url,data:{} }).then(res => {
                    if( !res.hasOwnProperty('response') ){
                        dispatch({
                            type: "ACCOUNT_INFO",
                            info: res['data']
                        })
                        return res;
                    }
                    return res['response'];
                });
            }
        }
    }
}

// 會員基本資料更新
export function ainfoUpdate( pathname,query={},data={} ){
    return(dispatch) => {
        const method = 'put';
        const initQuery = {};
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API()['myaccount']['updateInfo']}${search!=''? `?${search}`:''}`;
        delete data['email'];
        return Axios({ method,url,data }).then( res => {
            if( !res.hasOwnProperty('response') ){
                ainfo()(dispatch);
                return res;
            }
            return res['response'];
        });
    }
}

// 會員更新密碼
export function updatePWD( data ){
    return(dispatch) => {

        const method   = 'put';
        const url      = API()['myaccount']['updatePWD'];
        const token    = sessionStorage.getItem('jwt_account');

        if( token!=null && token!=undefined && token!="" ){
            return Axios({ method,url,data:{...data} }).then(res => {
                if( !res.hasOwnProperty('response') ){
                    return res;
                }
                return res['response'];
            });
        }
    }
}

// 會員銀行轉帳資料更新
export function bankInfoUpdate( pathname,query={},data={} ){
    return(dispatch) => {
        const method = 'put';
        const url = `${API()['myaccount']['updateBankInfo']}`;
        return Axios({ method,url,data }).then( res => {
            if( !res.hasOwnProperty('response') ){
                ainfo()(dispatch);
                return res;
            }
            return res['response'];
        });
    }
}

// 購物車商品 List 
export function cartsProductList( pathname,query ){
    return(dispatch) => {
        if( typeof window !== 'undefined' ){

            const cartToken   = localStorage.getItem('cartID');
            const initQuery   = {};
            const method      = 'get';
            const search      = queryString.stringify({ ...initQuery, ...query, cartToken });
            const url         = `${API()['myaccount']['carts']}${search!=''? `?${search}`: ''}`;
            
            return Axios({ method,url,data:{} }).then(res => {
                if( !res.hasOwnProperty('response') ){

                    const { cartToken, totalAmount, items } = res['data'];

                    dispatch({
                        type               : "ACCOUNT_CART_ITEMS",
                        cartToken          : cartToken,
                        cartTotalAmount    : totalAmount,
                        list               : items
                    });
                    return res;
                }
                return res['response'];
            });

        }
    }
}

// 購物車商品數量
export function cartsCount( pathname,query ){
    return(dispatch) => {
        if( typeof window !== 'undefined' ){

            const cartToken = localStorage.getItem('cartID');
            const initQuery = {};
            const method    = 'get';
            const search    = queryString.stringify({ ...initQuery, ...query, cartToken });
            const url       = `${API()['myaccount']['carts']}${search!=''? `?${search}`: ''}`;
            
            return Axios({ method,url,data:{} }).then(res => {
                if( !res.hasOwnProperty('response') ){
                    dispatch({
                        type: "ACCOUNT_CART_COUNT",
                        cartsCount: res['data']['items'].length
                    });
                    return res;
                }
                return res['response'];
            });
        }
    }
}

// 購物車刪除不要的商品
export function removeCartItem( pathname,query,data ){
    return(dispatch) => {

        const initQuery= {};
        const method= 'delete';
        const search= queryString.stringify({ ...initQuery, ...query });
        const url= `${API()['myaccount']['removeCartItem']}${search!=''? `?${search}`: ''}`;
        
        return Axios({ method, url, data }).then(res => {
            if( !res.hasOwnProperty('response') ){
                const { cartToken, totalAmount, items } = res['data'];
                dispatch({
                    type              : "ACCOUNT_CART_ITEMS",
                    cartToken         : cartToken,
                    cartTotalAmount   : totalAmount,
                    list              : items
                });
                return res;
            }
            return res['response'];
        });
    }
}

// 購物車修改商品購買的資訊
export function updateCartProductItem( pathname,query,data ){
    return(dispatch) => {

        const initQuery= {};
        const method= 'post';
        const search= queryString.stringify({ ...initQuery, ...query });
        const url= `${API()['myaccount']['updateCartItem']}${search!=''? `?${search}`: ''}`;

        return Axios({ method, url, data }).then(res => {
            if( !res.hasOwnProperty('response') ){
                // 檢查 Response Object 有沒有 response key name
                const { cartToken, totalAmount, items } = res['data'];

                dispatch({
                    type               : "ACCOUNT_CART_ITEMS",
                    cartToken          : cartToken,
                    cartTotalAmount    : totalAmount,
                    list               : items
                });
                return res;
            }
            return res['response'];
        });

    }
}

// 訂單列表
export function ordersList( pathname,query,data ){
    return(dispatch) => {

        const initQuery   = {};
        const method      = 'get';
        const search      = queryString.stringify({ ...initQuery, ...query });
        const url         = `${API()['myaccount']['orders']['list']}${search!=''? `?${search}`: ''}`;
        
        return Axios({ method, url, data }).then(res => {
            if( !res.hasOwnProperty('response') ){
                // 檢查 Response Object 有沒有 response key name
                const { page, pages, total, list } = res['data'];
                

                // const listSort = res['data']['list'].sort( (a, b) => {
                //     return Number(b['createTimeMs']) - Number(a['createTimeMs']);
                // }).map( item => {
                //     const orderDetail = item['orderDetail'].map( p_item => {
                //         return{ ...p_item, image: p_item['productImgs'][0]['path'] };
                //     })
                //     return {...item, orderDetail };
                // });

                // dispatch({
                //     type: "ACCOUNT_ORDERS_STATUS",
                //     page: res['data']['page'],
                //     pages: res['data']['pages'],
                //     total: res['data']['total']
                // });

                // dispatch({
                //     type: "ACCOUNT_ORDERS_LIST",
                //     list: listSort
                // });
                // return {
                //     page: res['data']['page'],
                //     pages: res['data']['pages'],
                //     total: res['data']['total'],
                //     list: listSort
                // };
                return res;
            }
            return res['response'];
        });

    }
}

// 訂單明細
export function ordersInfo( pathname,query,data ){
    return(dispatch) => {

        const initQuery   = {};
        const method      = 'get';
        const search      = queryString.stringify({ ...initQuery, ...query });
        const url         = `${API()['myaccount']['orders']['info']}${search!=''? `?${search}`: ''}`;
        
        return Axios({ method, url, data }).then(res => {
            // 檢查 Response Object 有沒有 response key name;
            if( !res.hasOwnProperty('response') ){
                // // 商品圖片篩選第一張作為主圖
                // const infoData  = res['data']['orderDetail'].map( p_item => {
                //     return{ ...p_item, image: p_item['productImgs'][0]['path'] };
                // })
                // const mergeData = { ...res['data'], orderDetail: infoData };

                // dispatch({
                //     type: "ACCOUNT_ORDERS_INFO",
                //     info: mergeData
                // });

                // return mergeData;

                // dispatch({
                //     type: "ACCOUNT_ORDERS_INFO",
                //     info: mergeData
                // });
                return res;
            }
            return res['response'];
        }).catch( err => err['response']);

    }
}

// 訂單退貨
export function ordersRefund( pathname="",query={},data={} ){
    return(dispatch) => {
        const initQuery= {};
        const method= 'post';
        const search= queryString.stringify({ ...initQuery, ...query });
        const url= `${API()['myaccount']['orders']['refund']}${search!=''? `?${search}`: ''}`;
        return Axios({ method, url, data }).then(res => {
            if( !res.hasOwnProperty('response') ){
                return res;
            }
            return res['response'];
        });
    }
}

const Axios = ( api ) => {

    const { method, url, data } = api;

    return axios({
        method     : method,
        url        : url,
        data       : { ...data, jwt_type: 'account'},
        headers    : {
            authorization: typeof window !== 'undefined'? (sessionStorage.getItem('jwt_account')||'') : ('')
        }
    }).catch( error => {
        return error;
    });
}