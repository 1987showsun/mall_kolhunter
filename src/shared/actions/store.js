/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import axios                 from 'axios';
import API                   from './apiurl';
import queryString           from 'query-string';

// Images
import kvNullImage           from '../public/images/init/1000x427initKvImages.jpg';
import nullImages            from '../public/images/init/420x420initBlockImages.jpg';

// Javascripts
import { initStore }         from '../public/javascripts/initData';

// 店舖資訊
export function storeInfo( pathname,query={},data={} ) {
    return (dispatch) => {

        const method       = 'get';
        const initQuery    = {};
        const search       = queryString.stringify({ ...initQuery, ...query });
        const url          = `${API()['mall']['store']['info']}${search!=''? `?${search}`: ''}`;

        dispatch({
            type: "STORE_INFO",
            info: {
                verified     : true,
                celebName    : "",
                celebToken   : "",
                cover        : kvNullImage, 
                description  : "",
                name         : 'Mall Kolhunter',
                photo        : nullImages,
                modified     : 0,
                salesAmount  : 0
            }
        });

        return Axios({method,url,data}).then(res=>{
            if( !res.hasOwnProperty('response') ){

                const { verified, celebName, celebToken, cover, description, modified, name, photo, salesAmount } = res['data'];

                dispatch({
                    type: "STORE_INFO",
                    info: {
                        verified     : verified     || false,
                        celebName    : celebName    || "",
                        celebToken   : celebToken   || "",
                        cover        : cover        || "", 
                        description  : description  || "",
                        name         : name         || "",
                        photo        : photo        || "",
                        modified     : modified     || 0,
                        salesAmount  : salesAmount  || 0
                    }
                });
                return res;
            }
            return res['response'];
        });
    }
}

export function storeList( pathname, query={}, data={} ) {
    return (dispatch) => {
        
        const method    = 'get';
        const initQuery = {
            page          : 1,
            limit         : 30,
            sort          : "desc",
            sortBy        : "created"
        };
        const search    = queryString.stringify({ ...initQuery, ...query });
        const url       = `${API()['mall']['store']['list']}${search!=''? `?${search}`: ''}`;

        dispatch({
            type        : "STORE_STATUS",
            limit       : 30,
            total       : 0,
            current     : 1
        });
        dispatch({
            type        : "CATRGORIES_STORE_LIST",
            list        : initStore()
        })

        return Axios({method, url, data}).then(res=>{
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type        : "STORE_STATUS",
                    limit       : res['data']['limit'],
                    total       : res['data']['total'],
                    current     : res['data']['page']
                })
                dispatch({
                    type        : "CATRGORIES_STORE_LIST",
                    list        : res['data']['list']
                })
                return res;
            }
            return res['response'];
        })
    }
}

export function storeProduct( pathname,query={},data={} ) {
    return (dispatch) => {

        const method      = 'get';
        const initQuery   = {
            limit           : 30,
            page            : 1,
            sort            : 'desc',
            order           : 'created'
        };
        const search      = queryString.stringify({ ...initQuery, ...query });
        const url         = `${API()['mall']['store']['product']}${search!=''? `?${search}`: ''}`;

        return Axios({ method, url, data}).then(res=>{
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type         : "STORE_STATUS",
                    limit        : res['data']['condition']['limit'] || 30,
                    total        : res['data']['total'],
                    current      : res['data']['page'],
                    totalPages   : res['data']['pages']
                })

                dispatch({
                    type         : 'STORE_PRODUCT',
                    list         : res['data']['products']
                })
                return res;
            }
            return res['response'];
        });
    }
}

// Server side Render
export function ssrStoreList( pathname,query ){
    return(dispatch) => {
        return(
            storeList( pathname,query )(dispatch)
        );
    }
}

export function ssrStoreDetail( pathname,query ){
    return(dispatch) => {
        return storeInfo( pathname,query )(dispatch).then( res => {
            return storeProduct( pathname,query )(dispatch);
        });
    }
}

// Axios function
const Axios = ( api ) => {
    return axios({
        method     : api['method'],
        url        : api['url'],
        data       : api['data'],
        headers    : {
            authorization: typeof window !== 'undefined'? sessionStorage.getItem('jwt_vendor') : '',
        }
    });
}