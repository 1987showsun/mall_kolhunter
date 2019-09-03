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
            return res;
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