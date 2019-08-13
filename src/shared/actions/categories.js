import axios from 'axios';
import API from './apiurl';
import queryString from 'query-string';

export function productList( url,query ) {
    return (dispatch,NODE_ENV,ssrPathname,ssrQuery) => {
        const search = queryString.stringify({ ...query,...ssrQuery });
        const url = `${API(NODE_ENV)['mall']['product']['list']}?${search}`;
        console.log( url );
        return Axios({method:'get',url,data:{}}).then(res=>{

            dispatch({
                type: "CATRGORIES_STATUS",
                limit: res['data']['limit'],
                total: res['data']['total'],
                current: res['data']['page']
            })

            dispatch({
                type: "CATRGORIES_PRODUCT_LIST",
                list: res['data']['list'],
                limit: res['data']['limit'],
                total: res['data']['total'],
                current: res['data']['page'],
                totalPages: res['data']['pages']
            })
            return res;
        })
    }
}

export function ssrProductList( NODE_ENV,pathname,query ){
    return(dispatch)=>{
        const ssrProduct = productList()(dispatch,NODE_ENV,pathname,query);
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