import axios from 'axios';
import API from './apiurl';

export function deliveries() {
    return (dispatch) => {
        const method = 'get';
        const url = API()['delivery']['list'];
        return Axios({method,url,data:{}});
    }
}

export function categories(){
    return (dispatch) => {
        const method = 'get';
        const url = API()['categories']['list'];
        return Axios({method,url,data:{}});
    }
}

export function getCartID(){
    return (dispatch) => {
        const method = 'get';
        const url = API()['shopping']['cartID'];
        return Axios({method,url,data:{}});
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