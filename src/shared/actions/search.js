import axios from 'axios';
import API from './apiurl';
import queryString from 'query-string';

export function searchList( pathname,query ) {
    return (dispatch,NODE_ENV) => {
        const type= query['type'];
        const search = { ...query };
        const url = `${API(NODE_ENV)['mall'][type]['list']}?${queryString.stringify(search)}`;

        dispatch({
            type: "SEARCH_LIST",
            list: []
        })
        return Axios({method:'get',url,data:{}}).then(res=>{
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
            return res;
        })
    }
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