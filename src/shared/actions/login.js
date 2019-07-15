import axios from 'axios';
import API from './apiurl';

export function signup( form ) {
    const { type } = form;
    const uri = API()['signup'][type];
    return (dispatch) => {
        dispatch({
            type: 'LOGIN_SUCCESS',
            info: {},
            token: '123123123'
        })
    }
}