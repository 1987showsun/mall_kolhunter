/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */
import axios         from 'axios';
import queryString   from 'query-string';
import API           from './apiurl';

// 最新商品
export function collections( pathname,query={},data={} ){
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

        return Axios({method, url, data}).then( res => {
            const { products, limit, total } = res['data'];
            dispatch({
                type  : "COLLECTIONS_LIST",
                limit : limit    || 0,
                total : total    || 0,
                list  : products || [],
            })
            return {
                ...res,
                
            };
        })
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