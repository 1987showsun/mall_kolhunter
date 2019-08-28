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


// 購物車商品 List 
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

// 購物車刪除不要的商品
export function removeCartItem( pathname,query,data ){
    return(dispatch) => {
        const innitQuery= {};
        const method= 'delete';
        const search= queryString.stringify({ ...innitQuery });
        const url= `${API()['myaccount']['removeCartItem']}${search!=''? `?${search}`: ''}`;
        
        return Axios({ method, url, data }).then(res => {
            dispatch({
                type: "ACCOUNT_CART_ITEMS",
                cartToken: res['data']['cartToken'],
                list: res['data']['items']
            });
            return res;
        })
    }
}

// 購物車修改商品購買的資訊
export function updateCartProductItem( pathname,query,data ){
    return(dispatch) => {

        const innitQuery= {};
        const method= 'post';
        const search= queryString.stringify({ ...innitQuery });
        const url= `${API()['myaccount']['updateCartItem']}${search!=''? `?${search}`: ''}`;
        
        return Axios({ method, url, data }).then(res => {
            
            console.log( 'sss',res['response'] );
            console.log( 'dddd',res.hasOwnProperty('response') );

            dispatch({
                type: "ACCOUNT_CART_ITEMS",
                cartToken: res['data']['cartToken'],
                list: res['data']['items']
            });
            return res;
        }).catch( err => {
            console.log( 'err',err['response'] )
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
    }).catch( error => {
        return error;
    });
}