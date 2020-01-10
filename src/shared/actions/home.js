/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import axios                         from 'axios';
import queryString                   from 'query-string';
import API                           from './apiurl';

//Actions
import { mallCategories }            from './common';

// Javascripts
import { initStore, initKv, initProduct }                 from '../public/javascripts/initData';

// 首頁廣告輪播
export function kv( pathname,query={},data={} ){
    return( dispatch )=>{

        const method    = 'get';
        const initQuery = {};
        const search    = queryString.stringify({ ...initQuery, ...query });
        const url       = `${API()['mall']['home']['kv']}${search!=""? `?${search}`:''}`;
        
        dispatch({
            type    : "HOME_KV",
            data    : initKv()
        })
        
        return Axios({method, url, data}).then( res => {
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type: "HOME_KV",
                    data: res['data'] || []
                })
                return res;
            }
            return res['response'];
        });
    }
}

// 推薦網紅
export function recommendStore( pathname,query={},data={} ){
    return( dispatch )=>{

        const method    = 'get';
        const initQuery = {};
        const search    = queryString.stringify({ ...initQuery, ...query });
        const url       = `${API()['mall']['store']['recommend']}${search!=""? `?${search}`:''}`;

        dispatch({
            type: "HOME_RECOMND_STORE",
            list : initStore()
        })

        return Axios({method, url, data}).then( res => {
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type: "HOME_RECOMND_STORE",
                    list: res['data'] 
                })
                return res;
            }
            return res['response'];
        });
    }
}

// 最新商品
export function latest( pathname,query={},data={} ){
    return( dispatch ) => {

        const method    = 'get';
        const initQuery = { 
            page     : 1,
            limit    : 30,
            sort     : "desc",
            order    : "time"
        };
        const search    = queryString.stringify({ ...initQuery, ...query });
        const url       = `${API()['mall']['home']['latest']}${ search!=""? `?${search}`: "" }`;

        dispatch({
            type  : "HOME_LATEST",
            list  : initProduct(),
            total : 0,
            limit : 30
        })

        return Axios({method, url, data}).then( res => {
            if( !res.hasOwnProperty('response') ){
                const { products, total, limit } = res['data'];
                dispatch({
                    type  : "HOME_LATEST",
                    list  : products || [],
                    total : total    || 0,
                    limit : limit    || 30
                })
                return res;
            }
            return res['response'];
        })
    }
}

// Server side render
export function getHome(pathname,query){
    return(dispatch) => {
        return(
            mallCategories(pathname,query)(dispatch),
            kv(pathname,query)(dispatch),
            recommendStore(pathname,query)(dispatch).then(res => {
                return latest(pathname,query)(dispatch)
            })
        );
    }
}

const Axios = ( api ) => {
    return axios({
        method   : api['method'],
        url      : api['url'],
        data     : api['data'],
        headers  : {
            authorization: typeof window !== 'undefined'? sessionStorage.getItem('jwt_account') : '',
        }
    });
}