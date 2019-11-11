/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import axios from 'axios';
import queryString from 'query-string';
import API from './apiurl';

// 登入
export function signin( form ) {
    const { type } = form;
    const url = API()['signin'][type];
    return (dispatch) => {
        return Axios({ method: 'post', url: url, data: form }).then( (res) => {
            if( !res.hasOwnProperty('response') ){
                switch( res['status'] ){
                    case 200:
                        sessionStorage.setItem(`jwt_${type}`,res['data']);
                        let selectType = "";
                        if( type=='account' ){
                            selectType= "ACCOUNT_SIGNIN_SUCCESS";
                        }else{
                            selectType= "VENDOR_SIGNIN_SUCCESS";
                        }

                        dispatch({
                            type: selectType,
                            token: res['data']
                        })
                        break;

                    default: 
                        break;
                }
                return res;
            }
            return res['response'];
        }).catch( err => err['response'] );
    }
}

// 註冊
export function signup( form ) {
    const { type } = form;
    const url = API()['signup'][type];
    return (dispatch) => {
        return Axios({ method: 'post', url, data: form }).then( res => {
            if( !res.hasOwnProperty('response') ){
                return res;
            }
            return res['response'];
        }).catch( err => err['response'] );
    }
}

// 登出
export function signout( clearSessionStorageKey ) {
    return (dispatch) => {
        if( clearSessionStorageKey=='jwt_account' ){
            localStorage.removeItem('cartID');
        }
        Object.keys( sessionStorage ).map( key => {
            if( clearSessionStorageKey.includes(key) ){
                sessionStorage.removeItem(key);
            }
        });
    }
}

// 清除Token
export function clearToken( type ) {
    return (dispatch) => {
        let selectType = "VENDOR_SIGNIN_SUCCESS";
        if( type=='account' ){
            selectType= "ACCOUNT_SIGNIN_SUCCESS";
        }

        dispatch({
            type  : selectType,
            token : null
        })

        sessionStorage.removeItem(`jwt_${type}`);

        return true;
    }
}

// 忘記密碼
export function forget( pathname, query={}, data={} ){
    return (dispatch) => {

        const method    = 'post';
        const initQuery = {};
        const search    = queryString.stringify({ ...initQuery, ...query });
        const url       = `${API()['forget'][data['type']]}${search!=""? `?${search}`:''}`;

        return Axios({ method, url, data }).then( res => {
            if( !res.hasOwnProperty('response') ){
                return res
            }
            return res['response'];
        }).catch( err => err['response'] );
    }
}

// 重設密碼
export function resetPassword( pathname="", query={}, data={} ){
    return (dispatch) => {

        const method    = 'put';
        const type      = data['type'];
        const initQuery = {};
        const search    = queryString.stringify({ ...initQuery, ...query });
        const url       = `${API()['reset_password'][type]}${search!=""? `?${search}`:''}`;
        return Axios({ method, url, data }).then( res => {
            if( !res.hasOwnProperty('response') ){
                return res;
            }
            return res['response'];
        }).catch( err => err['response'] );
    }
}

// 驗證
export function verify( form ) {
    const { type } = form;
    const uri      = API()['verify'][type];
    delete form['type'];

    Axios({ method: 'post', uri: uri, data: form }).then( res => {
    })

    return (dispatch) => {
        dispatch({
            type: 'VERFY_SUCCESS',
            info: {},
            token: '123123123'
        })
    }
}

// 清除JWT Token
export function clearJWTToken(){
    return (dispatch) => {
        dispatch({
            type     : 'CLEAR_ACCOUNT_JWT_TOKEN',
            token    : ''
        })
    }
}

const Axios = ( api ) => {
    return axios({
        method : api['method'],
        url    : api['url'],
        data   : api['data'],
        headers:{
            authorization: typeof window !== 'undefined'? sessionStorage.getItem('jwt_vendor') : '',
        }
    });
}