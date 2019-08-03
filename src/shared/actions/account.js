import axios from 'axios';
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

const Axios = ( api ) => {
    return axios({
        method: api['method'],
        url: api['url'],
        data: api['data'],
        headers:{
            Authorization: typeof window !== 'undefined'? sessionStorage.getItem('jwt_account') : '',
        }
    }).catch( error => {
        if( error['response']['data']['status_text']=="get user info error" ){
            sessionStorage.removeItem('jwt_account');
            window.location = '/account';
        }
        return error;
    });
}