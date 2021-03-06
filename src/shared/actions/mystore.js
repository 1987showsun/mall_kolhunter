/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import axios from 'axios';
import API from './apiurl';
import dayjs from 'dayjs';
import queryString from 'query-string';

// 網紅可販賣的商品列表
export function mystoreProductList( pathname,query, data={} ) {
    return (dispatch) => {
        
        const method    = 'get';
        const initQuery = {
            page          : 1,
            limit         : 30,
            sort          : "desc",
            sortBy        : "created"
        };
        const search    = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url       = `${API()['mystore']['candidates']}${search!=''? `?${search}`: ''}`;

        dispatch({
            type          : 'MYSTORE_STOREPRODUCT_STATUS',
            total         : 0,
            limit         : 30,
            current       : 1
        })

        return Axios({ method,  url, data }).then(res=>{
            if( !res.hasOwnProperty('response') ){

                const { total, limit, page, list } = res['data'];

                dispatch({
                    type       : 'MYSTORE_STOREPRODUCT_STATUS',
                    total      : total,
                    limit      : limit,
                    current    : page
                })
                dispatch({
                    type       : 'MYSTORE_STOREPRODUCT_LIST',
                    list       : list.map( item => {
                        return{
                            ...item,
                            kolFee : `${((item['kolFee'] || 0)*100).toFixed(1)}％`
                        }
                    })
                })
                return res;
            }
            return res['response'];
        });
    }
}

// 網紅商店店舖管理資訊
export function mystoreStoreInfo( pathname, query={}, data={} ) {
    return (dispatch) => {
    
        const method = 'get';
        const initQuery = {};
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API()['mystore']['getInfo']}${search!=''? `?${search}`: ''}`;

        return Axios({ method, url, data}).then( res =>{
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type: 'MYSTORE_STORE_INFO',
                    info: res['data']
                })
                return res;
            }
            return res['response'];
        });
    }
}

// 網紅店舖管理內已在販售的商品列表 
export function mystoreStoreProductList( pathname,query,data={} ) {
    return (dispatch) => {
        
        const method    = 'get';
        const initQuery = {
            page     : 1,
            limit    : 30,
            sort     : "desc",
            sortBy   : "created"
        };
        const search    = queryString.stringify({ ...initQuery, ...query });
        const url       = `${API()['mystore']['storeProductList']}${search!=''? `?${search}`: ''}`;

        dispatch({
            type     : 'MYSTORE_STOREPRODUCT_STATUS',
            total    : 0,
            limit    : 30,
            current  : 1
        })
        dispatch({
            type     : 'MYSTORE_STOREPRODUCT_LIST',
            list     : []
        })
        return Axios({ method, url, data }).then(res=>{
            if( !res.hasOwnProperty('response') ){
                const { list } = res['data'];
                dispatch({
                    type       : 'MYSTORE_STOREPRODUCT_STATUS',
                    total      : res['data']['total'],
                    limit      : res['data']['limit'],
                    current    : res['data']['page']
                })
                dispatch({
                    type       : 'MYSTORE_STOREPRODUCT_LIST',
                    list       : list.map( item => {
                        return{
                            ...item,
                            status: "on",
                            kolFee: `${((item['kolFee'] || 0)*100).toFixed(1)} ％`
                        }
                    })
                })
                return res;
            }
            return res['response'];
        });
    }
}

export function mystoreStoreProductAdd( pathname,query,data ) {
    return (dispatch) => {

        const method    = 'post';
        const initQuery = {};
        const search    = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url       = `${API()['mystore']['addProduct']}${search!=''? `?${search}`: ''}`;

        return Axios({ method, url, data }).then(res=>{
            if( !res.hasOwnProperty('response') ){
                return res;
            }
            return res['response'];
        });
    }
}

export function mystoreStoreProductRemove( pathname,query,data ) {
    return (dispatch) => {

        const method    = 'delete';
        const initQuery = {};
        const search    = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url       = `${API()['mystore']['deleteProduct']}${search!=''? `?${search}`: ''}`;
        
        return Axios({ method, url, data }).then(res=>{
            if( !res.hasOwnProperty('response') ){
                return res;
            }
            return res['response'];
        });
    }
}

// 更新店舖資料
export function mystoreStoreInfoUpdate( pathname, query={}, data={} ) {
    return (dispatch) => {

        const method    = 'put';
        const initQuery = {};
        const search    = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url       = `${API()['mystore']['updateInfo']}${search!=''? `?${search}`: ''}`;
        
        return Axios({ method, url, data }).then(res=>{
            if( !res.hasOwnProperty('response') ){
                return res;
            }
            return res['response'];
        });

    }
}

// 網紅銀行資訊
export function mystoreBankInfo( pathname,query,data={} ) {
    return (dispatch) => {

        const method    = 'get';
        const initQuery = {};
        const search    = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url       = `${API()['mystore']['bank']}${search!=''? `?${search}`: ''}`;
        
        return Axios({ method, url, data }).then(res=>{
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type: "MYSTORE_BANK_INFO",
                    info: res['data']
                })
                return res;
            }
            return res['response'];
        }).catch( err => {
            return err['response'];
        });
    }
}

// 網紅銀行資訊更新
export function mystoreBankInfoUpdate( pathname,query,data={} ) {
    return (dispatch) => {

        const method    = 'put';
        const initQuery = {};
        const search    = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url       = `${API()['mystore']['bank']}${search!=''? `?${search}`: ''}`;
        
        return Axios({ method, url, data }).then(res=>{
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type: "MYSTORE_BANK_INFO",
                    info: res['data']
                })
                return res;
            }
            return res['response'];
        }).catch( err => {
            return err['response'];
        });

    }
}

// 銷售資訊列表
export function mystoreSalesList( pathname,query={},data={} ) {
    return (dispatch) => {

        const YYYY   = dayjs().format('YYYY');
        const MM     = dayjs().format('MM');
        const DD     = dayjs().format('DD');
        const year   = String(YYYY);
        // const month  = String(DD<=15? MM-1 : MM);
        const month  = String(MM);
        const period = String(DD<=15? '1' : '2');
        const method = 'get';
        const initQuery = {
            year          : year,
            month         : month,
            period        : period
        };
        const search = queryString.stringify({ ...initQuery, ...query });
        const url    = `${API()['mystore']['fansorders']}${search!=""? `?${search}`:''}`;

        return Axios({ method, url, data }).then(res=>{
            if( !res.hasOwnProperty('response') ){
                return res;
            }
            return res['response'];
        }).catch( err => {
            return err['response'];
        });
    }
    
}

const Axios = ( api ) => {
    return axios({
        method: api['method'],
        url: api['url'],
        data: { ...api['data'], jwt_type: 'account'},
        headers:{
            authorization: typeof window !== 'undefined'? sessionStorage.getItem('jwt_account') : '',
        }
    });
}