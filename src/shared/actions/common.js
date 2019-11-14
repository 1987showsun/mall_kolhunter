/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import axios        from 'axios';
import queryString  from 'query-string';
import API          from './apiurl';

export function deliveries(pathname,query={},data={}){
    return (dispatch) => {
        const method   = 'get';
        const url      = API()['delivery']['list'];
        return Axios({method, url, data}).then( res => {
            if( !res.hasOwnProperty('response') ){
                return res;
            }
            return res['response'];
        }).catch( err => err['response'] );
    }
}

export function categories(pathname,query={},data={}){
    return (dispatch) => {
        const method   = 'get';
        const url      = API()['categories']['list'];
        return Axios({method, url, data}).then( res => {
            if( !res.hasOwnProperty('response') ){
                return res;
            }
            return res['response'];
        }).catch( err => err['response'] );
    }
}

export function getCartID(){
    return (dispatch) => {
        const method    = 'get';
        const url       = API()['shopping']['cartID'];
        if( typeof window !== 'undefined' ){
            if( !localStorage.getItem('cartID') ){
                return Axios({method,url,data:{}}).then( res => {
                    if( !res.hasOwnProperty('response') ){
                        const cartID = res['data']['cart'];
                        localStorage.setItem('cartID',cartID);
                        return res;
                    }
                    return res['response'];
                }).catch( err => err['response'] );
            }
        }
    }
}

export function mallCategories(pathname,query={},data={}){
    return( dispatch )=>{

        const method     = 'get';
        const initQuery  = {};
        const search     = queryString.stringify({ ...initQuery, ...query });
        const url        = `${API()['categories']['list']}${search!=''? `?${search}`:''}`;

        dispatch({
            type         : "MALL_CATEGORIES_LIST",
            list         : []
        })

        return Axios({method, url, data}).then( res => {
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type      : "MALL_CATEGORIES_LIST",
                    list      : res['data'] || []
                })
                return res;
            }
            return res['response'];
        }).catch( err => err['response'] );
    }
}

export function mallDelivery(pathname,query={},data={}){
    return(dispatch)=>{

        const method     = 'get';
        const url        = API()['delivery']['list'];

        return Axios({method,url,data}).then( res => {
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type: "MALL_DELIVERY_LIST",
                    list: res['data'] || []
                })
                return res;
            }
            return res['response'];
        }).catch( err => err['response'] );
    }
}

const Axios = ( api ) => {
    return axios({
        method     : api['method'],
        url        : api['url'],
        data       : api['data'],
        headers    : {
            authorization: typeof window !== 'undefined'? sessionStorage.getItem('jwt_account') : '',
        }
    });
}