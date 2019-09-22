import axios from 'axios';
import API from './apiurl';
import queryString from 'query-string';
import { deflate } from 'zlib';

// 建立訂單
export function paymentAddOrder( pathname, query, data ) {
    return (dispatch) => {
        const search = queryString.stringify({ ...query });
        const url = `${API()['payment']['addOrder']}${search!=''? `?${search}`: ''}`;
        return Axios({
            method:'post',
            url,
            data
        }).then( res => {
            if( !res.hasOwnProperty('response') ){
                return res;
            }
            return res['response'];
        }).catch( err => {
            return err['response'];
        });
    }
}

// 付款結果
export function paymentResult( pathname, query, data ) {
    return (dispatch) => {
        const search = queryString.stringify({ ...query });
        const url = `${API()['payment']['result']}${search!=''? `?${search}`: ''}`;
        return Axios({
            method:'get',
            url,
            data
        }).then(res=>{
            return res;
        });
    }
}

// 訂單明細
export function ordersInfo( pathname,query,data ){
    return(dispatch) => {
        const initQuery= {};
        const method= 'get';
        const search= queryString.stringify({ ...initQuery, ...query });
        const url= `${API()['myaccount']['orders']['info']}${search!=''? `?${search}`: ''}`;
        
        return Axios({ method, url, data }).then(res => {
            // 檢查 Response Object 有沒有 response key name;
            if( !res.hasOwnProperty('response') ){

                // 商品圖片篩選第一張作為主圖
                const infoData = res['data']['orderDetail'].map( p_item => {
                    return{ ...p_item, image: p_item['productImgs'][0]['path'] };
                })
                const mergeData = { ...res['data'], orderDetail: infoData };

                dispatch({
                    type: "ACCOUNT_ORDERS_INFO",
                    info: mergeData
                });

                //return mergeData;
                return {
                    ...res,
                    data: {
                        ...res['data'],
                        orderDetail: infoData
                    }
                }
            }
            return res['response'];
        });

    }
}

const Axios = ( api ) => {

    let jwtKeyName = "";
    switch( api['data']['memberType'] ){
        case 'member':
            jwtKeyName = "jwt_account";
            break;
        default:
            jwtKeyName = "jwt_vendor";
            break;
    }

    return axios({
        method: api['method'],
        url: api['url'],
        data: api['data'],
        headers:{
            authorization: typeof window !== 'undefined'? sessionStorage.getItem(jwtKeyName) : '',
        }
    });
}