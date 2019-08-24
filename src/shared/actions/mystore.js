import axios from 'axios';
import API from './apiurl';
import queryString from 'query-string';

export function mystoreProductList( pathname,query ) {
    return (dispatch,NODE_ENV) => {
        
        const initQuery = {
            page: 1,
            limit: 30,
            sort: "desc",
            sortBy: "created"
        };
        const search = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url = `${API(NODE_ENV)['mystore']['candidates']}${search!=''? `?${search}`: ''}`;

        return Axios({
            method:'get',
            url,
            data: null
        }).then(res=>{
            console.log('mystoreProductList',res);
            // dispatch({
            //     type: 'MYSTORE_STOREPRODUCT_STATUS',
            //     total: res['data']['total'],
            //     limit: res['data']['limit'],
            //     current: res['data']['pages']
            // })
            // dispatch({
            //     type: 'MYSTORE_STOREPRODUCT_LIST',
            //     list: res['data']['list']
            // })
            return res;
        });
    }
}

export function mystoreStoreProductList( pathname,query ) {
    return (dispatch,NODE_ENV) => {
        
        const initQuery = {
            page: 1,
            limit: 30,
            sort: "desc",
            sortBy: "created"
        };
        const search = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url = `${API(NODE_ENV)['mystore']['storeProductList']}${search!=''? `?${search}`: ''}`;

        return Axios({
            method:'get',
            url,
            data: null
        }).then(res=>{
            console.log('mystoreStoreProductList',res);
            dispatch({
                type: 'MYSTORE_STOREPRODUCT_STATUS',
                total: res['data']['total'],
                limit: res['data']['limit'],
                current: res['data']['pages']
            })
            dispatch({
                type: 'MYSTORE_STOREPRODUCT_LIST',
                list: res['data']['list']
            })
            return res;
        });
    }
}

export function mystoreStoreProductAdd( pathname,query,data ) {
    return (dispatch,NODE_ENV) => {
        const initQuery = {};
        const search = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url = `${API(NODE_ENV)['mystore']['addProduct']}${search!=''? `?${search}`: ''}`;
        return Axios({
            method:'post',
            url,
            data: null
        }).then(res=>{
            return res;
        });
    }
}

export function mystoreStoreProductRemove( pathname,query,data ) {
    return (dispatch,NODE_ENV) => {
        const initQuery = {};
        const search = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url = `${API(NODE_ENV)['mystore']['deleteProduct']}${search!=''? `?${search}`: ''}`;
        return Axios({
            method:'delete',
            url,
            data: null
        }).then(res=>{
            return res;
        });
    }
}

const Axios = ( api ) => {
    return axios({
        method: api['method'],
        url: api['url'],
        data: api['data'],
        headers:{
            authorization: typeof window !== 'undefined'? sessionStorage.getItem('jwt_account') : '',
        }
    });
}