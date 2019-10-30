import axios from 'axios';
import queryString from 'query-string';
import API from './apiurl';

//Actions
import { mallCategories } from './common';

// 首頁廣告輪播
export function kv( pathname,query ){
    return( dispatch,NODE_ENV )=>{
        const method = 'get';
        const url = API(NODE_ENV)['mall']['home']['kv'];

        dispatch({
            type: "HOME_KV",
            data: []
        })

        return Axios({method, url, data:{} }).then( res => {
            dispatch({
                type: "HOME_KV",
                data: res['data']
            })
            return res;
        });
    }
}

// 推薦網紅
export function recommendStore( pathname,query,data={} ){
    return( dispatch,NODE_ENV )=>{
        const method = 'get';
        const url = API(NODE_ENV)['mall']['store']['recommend'];

        dispatch({
            type: "HOME_RECOMND_STORE",
            list: []
        })

        return Axios({method, url, data:{} }).then( res => {
            if( !res.hasOwnProperty('response') ){

                const list = res['data'].map( item => {
                    return{
                        id           : item['id'],
                        image        : item['photo'],
                        storeName    : item['name'],
                        productCount : item['productCount'] || 0,
                        saleTotal    : item['saleTotal']    || 0
                    }
                })

                dispatch({
                    type: "HOME_RECOMND_STORE",
                    list
                })
                return res;
            }
            return res['response'];
        });
    }
}

// 最新商品
export function latest( pathname,query ){
    return( dispatch,NODE_ENV ) => {
        const initQuery = { 
            page: 1,
            limit: 30,
            sort: "desc",
            order: "time"
        };
        const search = queryString.stringify({ ...initQuery, ...query });
        const method = 'get';
        const url = `${API(NODE_ENV)['mall']['home']['latest']}${ search!=""? `?${search}`: "" }`;
        return Axios({method, url }).then( res => {
            dispatch({
                type: "HOME_LATEST",
                list: res['data']['products'] || []
            })
            return res;
        })
    }
}

// Server side render
export function getHome(NODE_ENV,pathname,query){
    return(dispatch) => {
        return kv(pathname,query)(dispatch,NODE_ENV).then( resKV => {
            return latest(pathname,query)(dispatch,NODE_ENV).then( resLatest => {
                return recommendStore(pathname,query)(dispatch,NODE_ENV).then( resRS => {
                    return mallCategories(pathname,query)(dispatch,NODE_ENV);
                })
            })
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
    });
}