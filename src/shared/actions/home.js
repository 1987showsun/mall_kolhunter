import axios from 'axios';
import API from './apiurl';

//Actions
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
        const method = 'get';
        const url = API(NODE_ENV)['mall']['home']['latest'];
        return Axios({method, url }).then( res => {
            dispatch({
                type: "HOME_LATEST",
                data: res['data']
            })
            return res;
        })
    }
}

export function mallCategories(pathname,query){
    return( dispatch,NODE_ENV )=>{
        const method = 'get';
        const url = API(NODE_ENV)['categories']['list'];
        return Axios({method, url, data:{} }).then( res => {
            dispatch({
                type: "MALL_CATEGORIES_LIST",
                list: res['data']
            })
            return res;
        })
    }
}

export function getHome(NODE_ENV,pathname,query){
    return(dispatch) => {
        const ssrMallCat =  mallCategories(pathname,query)(dispatch,NODE_ENV);
        const ssrKv = kv(pathname,query)(dispatch,NODE_ENV).then( res => {
            return latest(pathname,query)(dispatch,NODE_ENV);
        });
        return (
            ssrMallCat,
            ssrKv
        )
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