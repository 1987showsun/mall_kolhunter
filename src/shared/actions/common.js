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
        if( typeof window !== 'undefined' ){
            if( !localStorage.getItem('cartID') ){
                return Axios({method,url,data:{}}).then( res => {     
                    const cartID = res['data']['cart'];
                    localStorage.setItem('cartID',cartID);
                    return res;
                }).catch( err => {
                    return err['response'];
                });
            }
        }
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

export function mallDelivery(pathname,query){
    return( dispatch,NODE_ENV )=>{
        const method = 'get';
        const url = API()['delivery']['list'];
        return Axios({method, url, data:{} }).then( res => {
            dispatch({
                type: "MALL_DELIVERY_LIST",
                list: res['data']
            })
            return res;
        })
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