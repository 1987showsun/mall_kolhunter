import axios from 'axios';
import API from './apiurl';
import queryString from 'query-string';

export function myStoreStoreProduct( pathname,query ) {
    return (dispatch,NODE_ENV) => {
        const initQuery = {
            page: 1,
            limit: 30,
            sort: "desc",
            sortBy: "created"
        };
        const store_id = pathname.split('/').filter( item => item!='' )[1];
        const search = queryString.stringify({ ...initQuery, ...queryString.parse(query) });
        const url = `${API(NODE_ENV)['mystore']['storeProductList']}${search!=''? `?${search}`: ''}`;
        return Axios({
            method:'get',
            url,
            data: null
        }).then(res=>{
            console.log( res );
            // dispatch({
            //     type: 'STORE_PRODUCT',
            //     list: []
            // })
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