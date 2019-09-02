import axios from 'axios';
import API from './apiurl';
import queryString from 'query-string';

export function storeInfo( pathname,query ) {
    return (dispatch,NODE_ENV) => {
        const initQuery = {};
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API(NODE_ENV)['mall']['store']['info']}${search!=''? `?${search}`: ''}`;

        dispatch({
            type: "STORE_INFO",
            info: {
                cover: "",
                photo: "",
                name: "",
                description: ""
            }
        });
        return Axios({method:'get',url,data:{}}).then(res=>{
            dispatch({
                type: "STORE_INFO",
                info: { ...res['data'] }
            });
            return res;
        });
    }
}

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
        return storeList( pathname,query )(dispatch,NODE_ENV);
    }
}

export function ssrStoreDetail( NODE_ENV,pathname,query ){
    return(dispatch) => {
        return storeInfo( pathname,query )(dispatch,NODE_ENV);
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