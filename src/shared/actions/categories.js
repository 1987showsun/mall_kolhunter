import axios from 'axios';
import API from './apiurl';
import queryString from 'query-string';

// Actions
import { mallCategories, mallDelivery } from './common';

export function productList( pathname,query ) {
    return (dispatch,NODE_ENV) => {

        const initQuery = {
            page: 1,
            limit: 30,
            sort: "desc",
            order: "created"
        }
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API(NODE_ENV)['mall']['product']['list']}?${search}`;

        return Axios({method:'get',url,data:{}}).then(res=>{

            dispatch({
                type: "CATRGORIES_STATUS",
                limit: res['data']['condition']['limit'] || 30,
                total: res['data']['total'],
                current: res['data']['page'],
                totalPages: res['data']['pages']
            })

            dispatch({
                type: "CATRGORIES_PRODUCT_LIST",
                list: res['data']['products']
            })
            return res;
        })
    }
}

export function mallApproachProduct( pathname,query ){
    return( dispatch,NODE_ENV )=>{
        const initQuery = {};
        const method = 'get';
        const search = queryString.stringify({ ...initQuery, ...query })
        const url = `${API(NODE_ENV)['mall']['product']['detail']}${search!=''? `?${search}`:''}`;

        // 初始化
        dispatch({
            type: 'PRODUCT_INFO',
            token: "",
            name: "",
            celebrityNum: 0,
            images: [],
            description: [],
            delivery: [],
            spec: [],
            onSale: false,
            price: 0,
            sellPrice: 0
        })

        return Axios({method, url, data:{} }).then( res => {
            dispatch({
                type: 'PRODUCT_INFO',
                ...res['data']
            })
            return res;
        })
    }
}

// Server Side Render 商品列表
export function ssrProductList( NODE_ENV,pathname,query ){
    return(dispatch)=>{

        const initQuery = {
            page: 1,
            limit: 30,
            sort: "desc",
            order: "created"
        }
        const pathnameArray = pathname.split('/').filter( item => item!="" );
        const subCategoryID = pathnameArray[2] || pathnameArray[1] || "";
    
        query = { ...initQuery, ...query, category: subCategoryID }

        return productList(pathname,query)(dispatch,NODE_ENV).then( res => {
            return mallCategories(pathname,query)(dispatch,NODE_ENV).then( res => {
                return mallDelivery(pathname,query)(dispatch,NODE_ENV).then( res => {
                    return res;
                })
            })
        })
    }
}


export function ssrApproachProduct( NODE_ENV,pathname,query ){
    return(dispatch)=>{
        return mallApproachProduct(pathname,query)(dispatch,NODE_ENV).then( res => {
            return mallCategories(pathname,query)(dispatch,NODE_ENV);
        });
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