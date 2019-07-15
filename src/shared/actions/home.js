import axios              from 'axios';
import queryString        from 'query-string';
import apiUrl             from './apiurl';

//Actions

export function getHome( method,search,data ){
    return function( dispatch ){
        return null;
    }
}

const Axios = (method,url,data) => {
    return axios({
        method      : method,
        url         : url,
        data        : data,
        headers     : {
            Authorization : typeof window !== 'undefined'? (sessionStorage.getItem('token') == null? "" : sessionStorage.getItem('token')) : ""
        }
    });
}