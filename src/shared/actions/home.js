import axios from 'axios';
import queryString from 'query-string';
import API from './apiurl';

//Actions
import { mallCategories } from './common';

export function kv( pathname,query ){
    return( dispatch,NODE_ENV )=>{
        const method = 'get';
        const url = API(NODE_ENV)['mall']['home']['kv'];
        return Axios({method, url, data:{} }).then( res => {
            dispatch({
                type: "HOME_KV",
                data: res['data']
            })
            return res;
        });
    }
}

export function latest( pathname,query ){
    return( dispatch,NODE_ENV ) => {
        
        const initQuery = { 
            page: 1,
            limit: 30,
            sort: "desc",
            order: "time"
        };
        const search = queryString.stringify({ ...initQuery, ...query });
        const method = 'get';
        const url = `${API(NODE_ENV)['mall']['home']['latest']}${ search!=""? `?${search}`: "" }`;
        return Axios({method, url }).then( res => {
            dispatch({
                type: "HOME_LATEST",
                list: res['data']['products'] || []
            })
            return res;
        })
    }
}

export function getHome(NODE_ENV,pathname,query){
    return(dispatch) => {
        return kv(pathname,query)(dispatch,NODE_ENV).then( res => {
            return latest(pathname,query)(dispatch,NODE_ENV).then( res => {
                return mallCategories(pathname,query)(dispatch,NODE_ENV);
            })
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