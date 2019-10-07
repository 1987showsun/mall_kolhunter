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
                current: res['data']['page']
            })
            dispatch({
                type: 'MYSTORE_STOREPRODUCT_LIST',
                list: res['data']['list']
            })
            return res;
        });
    }
}

// 網紅商店店舖管理資訊
export function mystoreStoreInfo( pathname,query ) {
    return (dispatch,NODE_ENV) => {
    
        const initQuery = {};
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API(NODE_ENV)['mystore']['getInfo']}${search!=''? `?${search}`: ''}`;

        return Axios({
            method:'get',
            url,
            data: null
        }).then( res =>{
            dispatch({
                type: 'MYSTORE_STORE_INFO',
                info: res['data']
            })
            return res;
        }).catch( err => {
            console.log( 'err',err['response'] );
        });
    }
}

// 網紅店舖管理內已在販售的商品列表 
export function mystoreStoreProductList( pathname,query,data={} ) {
    return (dispatch,NODE_ENV) => {
        
        const method = 'get';
        const initQuery = {
            page: 1,
            limit: 30,
            sort: "desc",
            sortBy: "created"
        };
        const search = queryString.stringify({ ...initQuery, ...query });
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
        return Axios({ method, url, data }).then(res=>{

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
                current: res['data']['page']
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

// 更新店舖資料
export function mystoreStoreInfoUpdate( pathname,query,data ) {
    return (dispatch,NODE_ENV) => {

        const method = 'put';
        const initQuery = {};
        const search = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url = `${API(NODE_ENV)['mystore']['updateInfo']}${search!=''? `?${search}`: ''}`;
        
        return Axios({
            method,
            url,
            data
        }).then(res=>{
            return res;
        });

    }
}

// 網紅銀行資訊
export function mystoreBankInfo( pathname,query,data={} ) {
    return (dispatch,NODE_ENV) => {

        const method = 'get';
        const initQuery = {};
        const search = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url = `${API(NODE_ENV)['mystore']['bank']}${search!=''? `?${search}`: ''}`;
        
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
    return (dispatch,NODE_ENV) => {

        const method = 'put';
        const initQuery = {};
        const search = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url = `${API(NODE_ENV)['mystore']['bank']}${search!=''? `?${search}`: ''}`;
        
        return Axios({ method, url, data }).then(res=>{
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type: "MYSTORE_BANK_INFO",
                    info: res['data']
                })
                return res;
            }
            console.log( 'res error', res['response'] );
            return res['response'];
        }).catch( err => {
            console.log( 'error', err['response'] );
            return err['response'];
        });

    }
}

// 銷售資訊列表
export function mystoreSalesList( pathname,query,data={} ) {
    return (dispatch,NODE_ENV) => {

        const method = 'get';
        const initQuery = {};
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API()['mystore']['salesList']}${search!=""? `?${search}`:''}`;
        return Axios({ method, url, data }).then(res=>{
            if( !res.hasOwnProperty('response') ){
                // dispatch({
                //     type: "MYSTORE_BANK_INFO",
                //     info: res['data']
                // })
                return res;
            }
            console.log( 'res error', res['response'] );
            return res['response'];
        }).catch( err => {
            console.log( 'error', err['response'] );
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