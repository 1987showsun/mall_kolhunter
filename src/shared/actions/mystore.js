import axios from 'axios';
import API from './apiurl';
import queryString from 'query-string';

export function mystoreStoreProduct( pathname,query ) {
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
            console.log( res );
            // dispatch({
            //     type: 'MYSTORE_STOREPRODUCT_STATUS',
            //     list: []
            // })
            // dispatch({
            //     type: 'MYSTORE_STOREPRODUCT_LIST',
            //     list: []
            // })
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