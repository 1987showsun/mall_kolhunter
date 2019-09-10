import axios from 'axios';
import queryString from 'query-string';
import API from './apiurl';

export function listProduct( pathname,query, data={} ) {
    return (dispatch) => {

        // auth: 上架
        // non-display: 下架
        // none-auth: 審核中
        // delete: 已刪除

        const initQuery = {
            page:1,
            limit:30,
            sort:'desc',
            sortBy:'created'
        };
        const method = 'get';
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API()['myvendor']['product']['categories']}${ search!=''? `?${search}`:'' }`;

        dispatch({
            type: 'VENDOR_PRODUCT_LIST',
            list: []
        });
        
        return Axios({method,url,data}).then( res => {
            // 商品類別 陣列 -> 字串

            if( !res.hasOwnProperty('response') ){
                const categoryToText = ( arr ) => {
                    let text = "";
                    arr.forEach(( item,i ) => {
                        if( i==0 ){
                            text = item['title'];
                        }else if( i>=arr.length-1 ){
                            text = `${text}/${item['title']}`;
                        }else{
                            text = `${item['title']}/${text}`;
                        }
                    });
                    return text;
                }

                const list = res['data']['list'].map( item => {
                    return {
                        id: item['id'],
                        status: item['status'],
                        cover: item['image'][0]!=undefined? item['image'][0]['image'] : "",
                        name: item['name'],
                        brand: item['brand']!=undefined? item['brand'] : "N/A",
                        category: item['category']!=undefined? ( categoryToText(item['category']) ) :( "N/A"),
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
                    nonDisplay: res['data']['status']!=undefined? res['data']['status']['none-display'] : 0,
                    noneAuth: res['data']['status']!=undefined? res['data']['status']['none-auth'] : 0
                })

                dispatch({
                    type: 'VENDOR_PRODUCT_LIST',
                    list: list,
                });

                return res;
            }
            return null;
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

// 審查商品list
export function reviewlistProduct( query ){
    return (dispatch) => {
        const method = 'get';
        const url = `${API()['myvendor']['product']['review']}${query}`;
    }
}

// 刪除商品
export function deleteProduct( id ){
    return (dispatch)=>{
        const method = 'delete';
        const url = `${API()['myvendor']['product']['delete']}`;
        return Axios({method,url,data: {id}});
    }
}

// 廠商資料
export function vinfo( method, formObject ){
    return (dispatch)=>{
        method = method || 'get';
        const url = `${API()['myvendor']['vinfo']}`;
        const data = formObject || {};
        return Axios({method,url,data}).then( res => {
            dispatch({
                type: "VENDOR_INFO",
                payload: res['data']
            })
            return res;
        });
    }
}

export function orderList( pathname,query,data={} ) {
    return (dispatch) => {

        const initQuery = {
            page: 1,
        };
        const method = 'get';
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API()['myvendor']['order']['list']}${search!=""? `?${search}`:""}`;

        return Axios({method,url,data}).then( res => {
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type: "VENDOR_ORDERS_STATUS",
                    total: res['data']['total'],
                    totalAmount: res['data']['TotalAmount']
                })
                dispatch({
                    type: "VENDOR_ORDERS_LIST",
                    list: res['data']['list']
                })
                return res;
            }
            return res['response'];
        });
    }
}

export function incListAccount( form ) {
    return (dispatch) => {
        dispatch({
            type: 'VENDOR_ACCOUNTS_LIST',
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
export function createProduct( type, formObject, step, method ) {
    return (dispatch) => {
        method = method || 'post';
        const url = API()['myvendor'][type]['create'][step];
        return Axios({ method, url, data: formObject });
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

// 廠商買的方案帳單列表
export function buyCaseBillList( pathname,query,data={} ) {
    return (dispatch) => {
        
        const initQuery = {
            page: 1,
            limit: 30,
            sort: "desc",
            sortBy: "created"
        };
        const method = 'get';
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API()['myvendor']['bill']['list']}${search!=""? `?${search}`:""}`;

        return Axios({method,url,data}).then(res => {
            if( !res.hasOwnProperty('response') ){
                // 重組給 table 用的列表
                const changeData = res['data'].map( item => {
                    return{
                        id: item['orderID'],
                        orderer: item['orderName'],
                        payMethod: payMethodChangeText(item['payMethod']), // 付款方式轉換文字
                        status: payStatusChangeText(item['orderStatus']), //item['orderStatus'],
                        total: item['amount'],
                        date: item['createTimeMs']
                    }
                })
            
                dispatch({
                    type: "VENDOR_BILL_LIST",
                    list: changeData
                })
                return res;
            }
            return res['response'];
        });

    }
}

// 廠商買的方案帳單詳細
export function buyCaseBillInfo( pathname,query,data={} ) {
    return (dispatch) => {
        const initQuery = {};
        const method = 'get';
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API()['myvendor']['bill']['info']}${search!=""? `?${search}`:""}`;
        return Axios({method,url,data}).then(res => {
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type: "VENDOR_BILL_INFO",
                    info: [res['data']]
                })
                return res;
            }
            return res['response'];
        });
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
        data: { ...api['data'], jwt_type: 'account'},
        headers:{
            authorization: typeof window !== 'undefined'? sessionStorage.getItem('jwt_vendor') : '',
        }
    }).catch( error => {
        if( error['response']['data']['status_text']=="get user info error" ){
            sessionStorage.removeItem('jwt_vendor');
            window.location = '/vendor';
        }
        return error;
    });
}

export function payMethodChangeText( method ){
    switch( method ){
        case 'atm':
            return 'ATM';
        case 'CC':
            return '信用卡';
        case 'CVS':
            return '超商付款';
    }
}

export function payStatusChangeText( method ){
    switch( method ){
        case 'init':
            return '尚未付款';
        default:
            return '未知'
    }
}