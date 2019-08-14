import axios from 'axios';
import API from './apiurl';
import queryString from 'query-string';

export function productList( url,query ) {
    return (dispatch,NODE_ENV) => {
        const search = queryString.stringify({ ...query });
        const url = `${API(NODE_ENV)['mall']['product']['list']}?${search}`;
        return Axios({method:'get',url,data:{}}).then(res=>{

            dispatch({
                type: "CATRGORIES_STATUS",
                limit: res['data']['limit'],
                total: res['data']['total'],
                current: res['data']['page']
            })

            dispatch({
                type: "CATRGORIES_PRODUCT_LIST",
                list: res['data']['list']
            })
            return res;
        })
    }
}

export function mallCategories(pathname,query){
    return( dispatch,NODE_ENV )=>{
        const method = 'get';
        const url = API(NODE_ENV)['categories']['mall'];
        return Axios({method, url, data:{} }).then( res => {
            dispatch({
                type: "MALL_CATEGORIES_LIST",
                list: res['data']
            })
            return res;
        })
    }
}

export function ssrProductList( NODE_ENV,pathname,query ){
    return(dispatch)=>{
        const ssrProduct = productList(pathname,query)(dispatch,NODE_ENV);
        return(
            ssrProduct
        );
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