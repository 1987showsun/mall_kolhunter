import axios from 'axios';
import API from './apiurl';
import queryString from 'query-string';

export function searchList( pathname,query ) {
    return (dispatch,NODE_ENV) => {

        const initQuery = {
            page: 1,
            limit: 30,
            sort: "desc",
            order: "created"
        }
        const type= query['type'];
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API(NODE_ENV)['mall'][type]['list']}${ search!=""? `?${search}`:"" }`;

        // 初始化
        dispatch({
            type: "SEARCH_STATUS",
            limit: 30,
            total: 0,
            current: 1,
            totalPages: 1
        })
        dispatch({
            type: "SEARCH_LIST",
            list: []
        })

        return Axios({method:'get',url,data:{}}).then(res=>{
            switch( type ){
                case 'product':
                    searchTypeToProduct(dispatch,res);
                    break;

                case 'store':
                    searchTypeToStore(dispatch,res);
                    break;
            }
            return res;
        })
    }
}

const searchTypeToProduct = ( dispatch,res ) => {
    dispatch({
        type: "CATRGORIES_STATUS",
        limit: res['data']['condition']['limit'] || 30,
        total: res['data']['total'],
        current: res['data']['page'],
        totalPages: res['data']['pages']
    })

    dispatch({
        type: "SEARCH_LIST",
        list: res['data']['products']
    })
}

const searchTypeToStore = ( dispatch,res ) => {
    dispatch({
        type: "SEARCH_STATUS",
        limit: res['data']['limit'],
        total: res['data']['total'],
        current: res['data']['page']
    })
    dispatch({
        type: "SEARCH_LIST",
        list: res['data']['list']
    })
}


export function ssrSearchList( NODE_ENV,pathname,query ){
    return(dispatch) => {
        const ssrSearch = searchList(pathname,query)(dispatch,NODE_ENV);
        return (
            ssrSearch
        )
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