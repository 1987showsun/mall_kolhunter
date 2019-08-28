import axios from 'axios';
import queryString from 'query-string';
import API from './apiurl';

export function ainfo(){
    return(dispatch) => {
        const method = 'get';
        const url = API()['myaccount']['info'];
        if( typeof window !== 'undefined' ){
            const token = sessionStorage.getItem('jwt_account');
            if( token!=null ){
                Axios({ method,url,data:{} }).then(res => {
                    dispatch({
                        type: "ACCOUNT_INFO",
                        info: res['data']
                    })
                })
            }
        }
    }
}

export function cartsProductList( pathname,query ){
    return(dispatch) => {
        if( typeof window !== 'undefined' ){
            const cartToken = localStorage.getItem('cartID');
            const innitQuery= {};
            const method= 'get';
            const search= queryString.stringify({ ...innitQuery, cartToken });
            const url= `${API()['myaccount']['carts']}${search!=''? `?${search}`: ''}`;
            
            return Axios({ method,url,data:{} }).then(res => {
                dispatch({
                    type: "ACCOUNT_CART_ITEMS",
                    cartToken: res['data']['cartToken'],
                    list: res['data']['items']
                });
                return res;
            })
        }
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
    }).catch( error => {
        // if( error['response']['data']['status_text']=="get user info error" ){
        //     sessionStorage.removeItem('jwt_account');
        //     window.location = '/account';
        // }
        return error;
    });
}