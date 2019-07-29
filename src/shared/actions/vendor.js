import axios from 'axios';
import API from './apiurl';

export function listProduct( query ) {
    return (dispatch) => {

        // auth: 上架
        // non-display: 下架
        // none-auth: 審核中
        // delete: 已刪除

        const method = 'get';
        const url = `${API()['myvendor']['product']['categories']}${query}`;
        Axios({method,url,data: {}}).then( res => {
            console.log( res );
            const list = res['data']['list'].map( item => {
                return {
                    id: item['productToken'],
                    status: item['status'],
                    cover: item['image'][0]!=undefined? item['image'][0]['imagePath'] : "",
                    name: item['name'],
                    brand: item['brand']!=undefined? item['brand'] : "N/A",
                    store: item['store']!=undefined? item['store'] : 0,
                    price: item['price']!=undefined? item['price'] : 0,
                    sellPrice: item['sellPrice']!=undefined? item['sellPrice'] : item['price'],
                    divided: item['profitMargin']!=undefined? item['profitMargin'] : 0
                }
            })

            dispatch({
                type: "VENDOR_PRODUCT_HEAD",
                total: res['data']['total'] || 0,
                auth: res['data']['status']!=undefined? res['data']['status']['auth'] : 0,
                nonDisplay: res['data']['status']!=undefined? res['data']['status']['non-display'] : 0,
                noneAuth: res['data']['status']!=undefined? res['data']['status']['none-auth'] : 0
            })

            dispatch({
                type: 'VENDOR_PRODUCT_LIST',
                list: list,
            });
        });
    }
}

// 商品資訊
export function infoProduct( query ) {
    return (dispatch) => {
        const method = 'get';
        const url = `${API()['myvendor']['product']['info']}${query!=""? `?${query}`:''}`;
        return Axios({method,url,data: {}});
    }
}

export function incListOrder( form ) {
    return (dispatch) => {

        dispatch({
            type: 'INC_HEAD_ORDER',
            to_be_shipped_area: 4,
            on_passage: 10,
            successful_delivery: 10,
            cancel: 4,
            returned_purchase: 2,
            total: 30
        })

        dispatch({
            type: 'INC_CATEGORIES_LIST',
            total: 30,
            list: [
                {
                    id : "MALLKOL00000000000001",
                    orderer: "零八九五七",
                    quantity: 4,
                    transport: "黑貓宅急便",
                    status: "待出貨",
                    createdate: "2019-12-12"
                },
                {
                    id : "MALLKOL00000000000002",
                    orderer: "Sam Sam",
                    quantity: 2,
                    transport: "中華郵政",
                    status: "已出貨",
                    createdate: "2019-11-28"
                },
                {
                    id : "MALLKOL00000000000003",
                    orderer: "DDDDDD",
                    quantity: 100,
                    transport: "宅配通",
                    status: "已送達",
                    createdate: "2019-11-28"
                }
            ]
        })
    }
}

export function incListAccount( form ) {
    return (dispatch) => {
        dispatch({
            type: 'INC_CATEGORIES_LIST',
            total: 30,
            list: [
                {
                    id : "MALLKOL00000000000001",
                    orderer: "零八九五七",
                    quantity: 4,
                    transport: "黑貓宅急便",
                    status: "待出貨",
                    createdate: "2019-12-12",
                    total: 123456789
                },
                {
                    id : "MALLKOL00000000000002",
                    orderer: "Sam Sam",
                    quantity: 2,
                    transport: "中華郵政",
                    status: "已出貨",
                    createdate: "2019-11-28",
                    total: 123456789
                },
                {
                    id : "MALLKOL00000000000003",
                    orderer: "DDDDDD",
                    quantity: 100,
                    transport: "宅配通",
                    status: "已送達",
                    createdate: "2019-11-28",
                    total: 123456789
                }
            ]
        })
    }
}

// 新增商品
export function createProduct( type, formObject, step, method1 ) {
    return (dispatch) => {
        const method = method1 || 'post';
        const url = API()['myvendor'][type]['create'][step];
        return Axios({method,url,data: formObject});
    }
}

// 商品上下架
export function productPutsaleAndDiscontinue( type, formObject ) {
    return (dispatch) => {
        
        const method = 'put';
        const url = API()['myvendor']['product'][type];
        const data= {
            product_id: formObject['id']
        };

        return Axios({method,url,data});

    }
}

// 
export function getVerifyToke( params ) {
    return (dispatch) => {
        const method = 'post';
        const url = API()['verify']['vendor'];
        return Axios({method,url,data: params}).then( res => {
            return res;
        });
    }
}

// 驗證修改密碼
export function verify(){
    return(dispatch) => {
        const method = 'post';
        const url = API()['verify']['vendor'];
        const data= {
            email: "",
            code: ""
        };

        return Axios({method,url,data});
    }
}

export function programContract(){
    return (dispatch) => {

    }
}

// 取得類別
export function getCategories() {
    return (dispatch) => {
        const method = 'get';
        const data = null;
        const url = API()['myvendor']['productCategories'];
        return Axios({method,url,data});
    }
}

const Axios = ( api ) => {
    return axios({
        method: api['method'],
        url: api['url'],
        data: api['data'],
        headers:{
            Authorization: typeof window !== 'undefined'? sessionStorage.getItem('jwt_vendor') : '',
        }
    }).catch( error => {

        if( error['response']['data']['status_text']=="get user info error" ){
            window.location = '/vendor';
        }
        return error;
    });
}