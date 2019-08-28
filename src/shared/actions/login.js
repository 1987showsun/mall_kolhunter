import axios from 'axios';
import API from './apiurl';

// 登入
export function signin( form ) {
    const { type } = form;
    const url = API()['signin'][type];
    return (dispatch) => {
        return Axios({ method: 'post', url: url, data: form }).then( (res) => {
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
            return res;
        }).catch( err => {
            return err.response;
        })
    }
}

// 註冊
export function signup( form ) {
    const { type } = form;
    const url = API()['signup'][type];
    return (dispatch) => {
        return Axios({ method: 'post', url, data: form }).then( res => {
            return res;
        }).catch( err => {
            return err.response;
        })
    }
}

// 登出
export function signout( clearSessionStorageKey ) {
    return (dispatch) => {
        Object.keys( sessionStorage ).map( key => {
            if( clearSessionStorageKey.includes(key) ){
                sessionStorage.removeItem(key);
            }
        })
        clearJWTToken()(dispatch);
    }
}

// 忘記密碼

// 重設密碼
export function resetPassword( type, formObject ){
    return (dispatch) => {
        const url = API()['reset_password'][type];
        type = type = type || 'account';
        return Axios({ method: 'put', url, data: formObject }).catch( error => {return error});
    }
}

// 驗證
export function verify( form ) {
    const { type } = form;
    const uri = API()['verify'][type];
    delete form['type'];

    Axios({ method: 'post', uri: uri, data: form }).then( res => {
        console.log( res );
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
            type: 'CLEAR_ACCOUNT_JWT_TOKEN',
            token: ''
        })
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