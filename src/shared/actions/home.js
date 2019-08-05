import axios from 'axios';
import API from './apiurl';

//Actions

export function kv( method,formObject ){
    return function( dispatch ){
        method = method || 'get';
        const url = API()['mall']['home']['kv'];
        return Axios({method, url, data:{} }).then( res => {
            dispatch({
                type: "HOME_KV",
                data: res['data']
            })
            return res;
        });
    }
}

export function latest( method,formObject ){
    return (dispatch) => {
        method = method || 'get';
        const url = API()['mall']['home']['latest'];
        return Axios({method, url }).then( res => {
            dispatch({
                type: "HOME_LATEST",
                data: res['data']
            })
            return res;
        })
    }
}

export function ssrUse(){
    return(dispatch) => {
        const ssrKv = kv()(dispatch);
        const ssrLatest = latest()(dispatch);
        return{
            ssrLatest,
            ssrKv
        }
    }
}

const Axios = ( api ) => {
    return axios({
        method: api['method'],
        url: api['url'],
        data: api['data'],
        headers:{
            Authorization: typeof window !== 'undefined'? sessionStorage.getItem('jwt_vendor') : '',
        }
    });
}