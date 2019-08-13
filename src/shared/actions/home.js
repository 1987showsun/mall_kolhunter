import axios from 'axios';
import API from './apiurl';

//Actions
export function kv( method,formObject ){
    return function( dispatch,NODE_ENV,pathname,query ){
        method = method || 'get';
        const url = API(NODE_ENV,pathname,query)['mall']['home']['kv'];
        return Axios({method, url, data:{} }).then( res => {
            dispatch({
                type: "HOME_KV",
                data: res['data']
            })
        });
    }
}

export function latest( method,formObject ){
    return (dispatch,NODE_ENV,pathname,query) => {
        method = method || 'get';
        const url = API(NODE_ENV,pathname,query)['mall']['home']['latest'];
        return Axios({method, url }).then( res => {
            dispatch({
                type: "HOME_LATEST",
                data: res['data']
            })
        })
    }
}

export function getHome(NODE_ENV,pathname,query){
    return(dispatch) => {
        const ssrKv = kv()(dispatch,NODE_ENV,pathname,query);
        const ssrLatest = latest()(dispatch,NODE_ENV,pathname,query);
        return (
            ssrKv,
            ssrLatest
        )
    }
}

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