import axios from 'axios';
import API from './apiurl';
import queryString from 'query-string';

export function storeList( pathname,query ) {
    return (dispatch,NODE_ENV) => {
        const initQuery = {
            page: 1,
            limit: 30,
            sort: "desc",
            sortBy: "created"
        };
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API(NODE_ENV)['mall']['store']['list']}${search!=''? `?{search}`: ''}`;
        
        return Axios({method:'get',url,data:{}}).then(res=>{
            dispatch({
                type: "STORE_STATUS",
                limit: res['data']['limit'],
                total: res['data']['total'],
                current: res['data']['page']
            })
            dispatch({
                type: "CATRGORIES_STORE_LIST",
                list: res['data']['list'],
                limit: res['data']['limit'],
                total: res['data']['total'],
                current: res['data']['page'],
                totalPages: res['data']['pages']
            })
            return res;
        })
    }
}

export function storeProduct( pathname,query ) {
    return (dispatch,NODE_ENV) => {
        const initQuery = {
            limit: 30,
            page: 1,
            sort: 'desc',
            sortBy: 'created'
        };
        const store_id = pathname.split('/').filter( item => item!='' )[1];
        const search = queryString.stringify({ ...initQuery, ...queryString.parse(query), storeID: store_id });
        const url = `${API(NODE_ENV)['mall']['store']['product']}${search!=''? `?${search}`: ''}`;
        return Axios({
            method:'get',
            url,
            data: null
        }).then(res=>{
            console.log(res);
            dispatch({
                type: 'STORE_PRODUCT',
                list: []
            })
            return res;
        });
    }
}

// Server side Render
export function ssrStoreList( NODE_ENV,pathname,query ){
    return(dispatch) => {
        const ssrStore = storeList( pathname,query )(dispatch,NODE_ENV);
        return (
            ssrStore
        )
    }
}

export function ssrStoreProduct( NODE_ENV,pathname,query ){
    return(dispatch) => {
        const ssrStoreProduct = storeProduct( pathname,query )(dispatch,NODE_ENV);
        return (
            ssrStoreProduct
        )
    }
}

// Axios function
const Axios = ( api ) => {
    return axios({
        method: api['method'],
        url: api['url'],
        data: api['data'],
        headers:{
            authorization: typeof window !== 'undefined'? sessionStorage.getItem('jwt_vendor') : '',
        }
    });
}