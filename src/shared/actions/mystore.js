import axios from 'axios';
import API from './apiurl';
import queryString from 'query-string';

// 網紅可販賣的商品列表
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

        dispatch({
            type: 'MYSTORE_STOREPRODUCT_STATUS',
            total: 0,
            limit: 30,
            current: 1
        })
        dispatch({
            type: 'MYSTORE_STOREPRODUCT_LIST',
            list: []
        })
        return Axios({
            method:'get',
            url,
            data: null
        }).then(res=>{
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

// 網紅店舖管理內已在販售的商品列表 
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

        dispatch({
            type: 'MYSTORE_STOREPRODUCT_STATUS',
            total: 0,
            limit: 30,
            current: 1
        })
        dispatch({
            type: 'MYSTORE_STOREPRODUCT_LIST',
            list: []
        })
        return Axios({
            method:'get',
            url,
            data: null
        }).then(res=>{

            const list = res['data']['list'].map( item => {
                return{
                    ...item,
                    status: "on"
                }
            });
            
            dispatch({
                type: 'MYSTORE_STOREPRODUCT_STATUS',
                total: res['data']['total'],
                limit: res['data']['limit'],
                current: res['data']['pages']
            })
            dispatch({
                type: 'MYSTORE_STOREPRODUCT_LIST',
                list: list
            })
            return res;
        });
    }
}

export function mystoreStoreProductAdd( pathname,query,data ) {
    return (dispatch,NODE_ENV) => {

        const method = 'post';
        const initQuery = {};
        const search = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url = `${API(NODE_ENV)['mystore']['addProduct']}${search!=''? `?${search}`: ''}`;

        return Axios({
            method,
            url,
            data
        }).then(res=>{
            return res;
        });
    }
}

export function mystoreStoreProductRemove( pathname,query,data ) {
    return (dispatch,NODE_ENV) => {

        const method = 'delete';
        const initQuery = {};
        const search = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url = `${API(NODE_ENV)['mystore']['deleteProduct']}${search!=''? `?${search}`: ''}`;
        
        return Axios({
            method,
            url,
            data
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