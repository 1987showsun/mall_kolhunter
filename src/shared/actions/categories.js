/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import axios           from 'axios';
import API             from './apiurl';
import queryString     from 'query-string';

// Actions
import { mallCategories, mallDelivery } from './common';

export function productList( pathname,query={},data={} ) {
    return (dispatch) => {

        const method    = 'get';
        const initQuery = {
            page          : 1,
            limit         : 30,
            sort          : "desc",
            order         : "created"
        }
        const search    = queryString.stringify({ ...initQuery, ...query });
        const url       = `${API()['mall']['product']['list']}?${search}`;

        return Axios({method,url,data}).then(res=>{
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type        : "CATRGORIES_STATUS",
                    limit       : res['data']['condition']['limit'] || 30,
                    total       : res['data']['total']              || 0,
                    current     : res['data']['page']               || 1,
                    totalPages  : res['data']['pages']              || 1
                })

                dispatch({
                    type        : "CATRGORIES_PRODUCT_LIST",
                    list        : res['data']['products']           || []
                })
                return res;
            }
            return ['response'];
        })
    }
}

export function mallApproachProduct( pathname,query={},data={} ){
    return( dispatch )=>{

        const method       = 'get';
        const initQuery    = {};
        const search       = queryString.stringify({ ...initQuery, ...query })
        const url          = `${API()['mall']['product']['detail']}${search!=''? `?${search}`:''}`;

        dispatch({
            type          : 'PRODUCT_INFO',
            adult         : false,
            combo         : false,
            onSale        : false,
            token         : "",
            name          : "",
            celebrityNum  : 0,
            images        : [],
            description   : [],
            delivery      : [],
            spec          : [],
            price         : 0,
            sellPrice     : 0
        })

        return Axios({method, url, data}).then( res => {
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type          : 'PRODUCT_INFO',
                    adult         : res['data']['adult']        || false,
                    combo         : res['data']['combo']        || false,
                    onSale        : res['data']['onSale']       || false,
                    token         : res['data']['token']        || "",
                    name          : res['data']['name']         || "",
                    celebrityNum  : res['data']['celebrityNum'] || 0,
                    images        : res['data']['images']       || [],
                    description   : res['data']['description']  || [],
                    delivery      : res['data']['delivery']     || [],
                    spec          : res['data']['spec']         || [],
                    price         : res['data']['price']        || 0,
                    sellPrice     : res['data']['sellPrice']    || 0
                })
                return res;
            }
            return res['response'];
        })
    }
}

// Server Side Render 商品列表
export function ssrProductList( pathname,query ){
    return(dispatch)=>{

        const initQuery = {
            page          : 1,
            limit         : 30,
            sort          : "desc",
            order         : "created"
        }
        const pathnameArray = pathname.split('/').filter( item => item!="" );
        const subCategoryID = pathnameArray[2] || pathnameArray[1] || "";
    
        query = { ...initQuery, ...query, category: subCategoryID }

        return productList(pathname,query)(dispatch).then( res => {
            return mallCategories(pathname,query)(dispatch).then( res => {
                return mallDelivery(pathname,query)(dispatch).then( res => {
                    return res;
                })
            })
        })
    }
}


export function ssrApproachProduct( pathname,query ){
    return(dispatch)=>{
        return (
            mallApproachProduct(pathname,query)(dispatch),
            mallCategories(pathname,query)(dispatch)
        );
    }
}

const Axios = ( api ) => {
    
    const { method='get', url='', data={} } = api;

    return axios({
        method    : method,
        url       : url,
        data      : data,
        headers   : {
            authorization: typeof window !== 'undefined'? sessionStorage.getItem('jwt_vendor') : '',
        }
    });
}