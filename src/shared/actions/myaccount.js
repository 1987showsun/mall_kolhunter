import axios from 'axios';
import queryString from 'query-string';
import API from './apiurl';

export function ainfo(){
    return(dispatch) => {
        if( typeof window !== 'undefined' ){

            const method = 'get';
            const url = API()['myaccount']['info'];
            const token = sessionStorage.getItem('jwt_account');

            if( token!=null && token!=undefined && token!="" ){
                // 檢查有無 jwt account token 有代表已登入 
                return Axios({ method,url,data:{} }).then(res => {
                    dispatch({
                        type: "ACCOUNT_INFO",
                        info: res['data']
                    })
                    return res;
                });
            }

        }
    }
}


// 購物車商品 List 
export function cartsProductList( pathname,query ){
    return(dispatch) => {
        if( typeof window !== 'undefined' ){

            const cartToken = localStorage.getItem('cartID');
            const initQuery= {};
            const method= 'get';
            const search= queryString.stringify({ ...initQuery, ...query, cartToken });
            const url= `${API()['myaccount']['carts']}${search!=''? `?${search}`: ''}`;
            
            return Axios({ method,url,data:{} }).then(res => {
                dispatch({
                    type: "ACCOUNT_CART_ITEMS",
                    cartToken: res['data']['cartToken'],
                    cartTotalAmount: res['data']['totalAmount'],
                    list: res['data']['items']
                });
                return res;
            });

        }
    }
}

// 購物車刪除不要的商品
export function removeCartItem( pathname,query,data ){
    return(dispatch) => {

        const initQuery= {};
        const method= 'delete';
        const search= queryString.stringify({ ...initQuery, ...query });
        const url= `${API()['myaccount']['removeCartItem']}${search!=''? `?${search}`: ''}`;
        
        return Axios({ method, url, data }).then(res => {
            dispatch({
                type: "ACCOUNT_CART_ITEMS",
                cartToken: res['data']['cartToken'],
                cartTotalAmount: res['data']['totalAmount'],
                list: res['data']['items']
            });
            return res;
        });

    }
}

// 購物車修改商品購買的資訊
export function updateCartProductItem( pathname,query,data ){
    return(dispatch) => {

        const initQuery= {};
        const method= 'post';
        const search= queryString.stringify({ ...initQuery, ...query });
        const url= `${API()['myaccount']['updateCartItem']}${search!=''? `?${search}`: ''}`;

        return Axios({ method, url, data }).then(res => {
            if( !res.hasOwnProperty('response') ){
                // 檢查 Response Object 有沒有 response key name
                dispatch({
                    type: "ACCOUNT_CART_ITEMS",
                    cartToken: res['data']['cartToken'],
                    cartTotalAmount: res['data']['totalAmount'],
                    list: res['data']['items']
                });
                return res;
            }
            return res['response'];
        });

    }
}

// 訂單列表
export function ordersList( pathname,query,data ){
    return(dispatch) => {

        const initQuery= {};
        const method= 'get';
        const search= queryString.stringify({ ...initQuery, ...query });
        const url= `${API()['myaccount']['orders']['list']}${search!=''? `?${search}`: ''}`;
        
        return Axios({ method, url, data }).then(res => {
            if( !res.hasOwnProperty('response') ){
                // 檢查 Response Object 有沒有 response key name
                dispatch({
                    type: "ACCOUNT_ORDERS_LIST",
                    list: res['data']
                });
                return res['data'];
            }
            return res['response'];
        });

    }
}

// 訂單明細
export function ordersInfo( pathname,query,data ){
    return(dispatch) => {
        console.log( query );
        const initQuery= {};
        const method= 'get';
        const search= queryString.stringify({ ...initQuery, ...query });
        const url= `${API()['myaccount']['orders']['info']}${search!=''? `?${search}`: ''}`;
        
        return Axios({ method, url, data }).then(res => {
            if( !res.hasOwnProperty('response') ){
                // 檢查 Response Object 有沒有 response key name
                console.log('ordersInfo',res);
                dispatch({
                    type: "ACCOUNT_ORDERS_INFO",
                    info: {}
                });
                return res;
            }
            return res['response'];
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
    }).catch( error => {
        return error;
    });
}