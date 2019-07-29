import axios from 'axios';
import API from './apiurl';

export function signin( form ) {
    const { type } = form;
    const url = API()['signin'][type];
    delete form['type'];
    return (dispatch) => {
        return Axios({ method: 'post', url: url, data: form }).then( (res) => {
            sessionStorage.setItem(`jwt_${type}`,res['data']);
            dispatch({
                type: 'USER_SIGNIN_SUCCESS',
                token: res['data']
            })
            return res;
        }).catch( err => {
            return err.response;
        })
    }
}

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

export function clearJWTToken(){
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_JWT_TOKEN',
            token: ''
        })
    }
}

const Axios = ( api ) => {
    return axios({
        method: 'post',
        url: api['url'],
        data: api['data']
    });
}