import axios from 'axios';
import queryString from 'query-string';
import dayjs from 'dayjs';
import API from './apiurl';

// Lang
import lang from '../public/lang/lang.json';

// 額度新增刪除
export function quota( actions="less",data={} ) {
    return (dispatch) => {
        switch( actions ){
            case 'less':
                data = {
                    ...data,
                    remainQuantity: data['remainQuantity']-1
                }
                break;

            default:
                data = {
                    ...data,
                    remainQuantity: data['remainQuantity']+1
                }
                break;
        }

        dispatch({
            type: "VENDOR_INFO",
            payload: data
        })
    }
}

// 商品列表
export function listProduct( pathname,query={}, data={} ) {
    return (dispatch) => {

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
            type: "VENDOR_PRODUCT_HEAD",
            noneDisplay: 0,
            display: 0,
            review: 0,
            total: 0
        })
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
                        status: item['status']=="none-auth"? (item['status']): ( item['display']==true? 'auth':'non-display' ),
                        cover: item['images'].length!=0? item['images'][0]['path'] : "",
                        name: item['name'],
                        brand: item['brand']!=undefined? item['brand'] : "N/A",
                        category: item['category']!=undefined? ( categoryToText(item['category']) ) :( "N/A"),
                        store: item['store']!=undefined? item['store'] : 0,
                        price: item['price']!=undefined? item['price'] : 0,
                        sellPrice: item['sellPrice']!=undefined? item['sellPrice'] : item['price'],
                        divided: item['profitMargin']!=undefined? item['profitMargin'] : 0,
                        display: item['display']
                    }
                })

                dispatch({
                    type: "VENDOR_PRODUCT_HEAD",
                    noneDisplay: res['data']['status']['none-display'] || 0,
                    display: res['data']['status']['display'] || 0,
                    review: res['data']['status']['review'] || 0,
                    total: res['data']['status']['total'] || 0
                })

                dispatch({
                    type: 'VENDOR_PRODUCT_LIST',
                    list: list,
                });

                return res;
            }
            return res['response'];
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

// 商品刪除
export function deleteProduct( id ){
    return (dispatch)=>{
        const method = 'delete';
        const url = `${API()['myvendor']['product']['delete']}`;
        return Axios({method,url,data: {id}}).then( res => {
            if( !res.hasOwnProperty('response') ){
                return res;
            }
            return res['response']
        });
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

// 訂單列表
export function orderList( pathname,query,data={} ) {
    return (dispatch) => {

        const initQuery = {
            page: 1
        };
        const method = 'get';
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API()['myvendor']['order']['list']}${search!=""? `?${search}`:""}`;

        return Axios({method,url,data}).then( res => {
            if( !res.hasOwnProperty('response') ){

                const list = res['data']['list'].map( item => {
                    return {
                        id: item['orderID'],
                        orderer: item['orderName'],
                        deliveryName: item['deliveryName'],
                        quantity: item['orderDetail'].length,
                        status: lang['zh-TW']['orderStatus'][item['orderStatus']],
                        createdate: dayjs(item['orderTimeMs']).format('YYYY/MM/DD')
                    }
                })

                dispatch({
                    type: "VENDOR_ORDERS_STATUS",
                    total: res['data']['total'],
                    totalAmount: res['data']['TotalAmount']
                })
                dispatch({
                    type: "VENDOR_ORDERS_LIST",
                    list: list
                })
                return res;
            }
            return res['response'];
        });

    }
}

// 訂單列表
export function orderInfo( pathname,query,data={} ) {
    return (dispatch) => {
        const initQuery = {};
        const method = 'get';
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API()['myvendor']['order']['info']}${search!=""? `?${search}`:""}`;

        return Axios({method,url,data}).then( res => {
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type: "VENDOR_ORDERS_INFO",
                    info: res['data']
                })
                return res;
            }
            return res['response'];
        })
    }
}

// 訂單列表
export function orderInfoProductDeliveryStatus( pathname,query,data={} ) {
    return (dispatch) => {
        
        const method = 'put';
        const initQuery = {};
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API()['myvendor']['order']['delivery']}${search!=""? `?${search}`:""}`;
        return Axios({method,url,data}).then( res => {
            if( !res.hasOwnProperty('response') ){
                return res;
            }
            return res['response'];
        });
        
    }
}

// 帳務列表
export function incListAccount( pathname="", query={}, data={} ) {
    return (dispatch) => {
        const YYYY   = dayjs().format('YYYY');
        const MM     = dayjs().format('MM');
        const DD     = dayjs().format('DD');
        const year   = String(YYYY);
        const month  = String(DD<=15? MM-1 : MM);
        const period = month==String(MM)? '1': '2';
        const method = 'get';
        const initQuery = {
            year   : year,
            month  : month,
            period : period
        };
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API()['myvendor']['account']['list']}${search!=""? `?${search}`:""}`;
        dispatch({
            type: 'VENDOR_ACCOUNTS_LIST',
            list: []
        });
        return Axios({method,url,data}).then( res => {
            if( !res.hasOwnProperty('response') ){

                const list = (res['data']['income'] || []).map( item => {
                    let total = 0;
                    item['orderDetail'].forEach( orderDetailItem => {
                        total = total + orderDetailItem['amount'];
                    })

                    return {
                        id: item['orderID'],
                        orderer: item['orderName'],
                        orderStatus: lang['zh-TW']['orderStatus'][item['orderStatus']],
                        quantity: item['orderDetail'].length,
                        total: total,
                        date: dayjs(item['orderTimeMs']).format('YYYY / MM / DD')
                    }
                })

                dispatch({
                    type: 'VENDOR_ACCOUNTS_LIST',
                    list: list
                });
                return res;
            }
            return res['response'];
        });
    }
}

// 新增商品
export function createProduct( formObject, step, method ) {
    return (dispatch) => {
        method = method || 'post';
        const url = `${API()['myvendor']['product']['create'][step]}`;
        return Axios({ method, url, data: formObject });
    }
}

// 商品上下架
export function productPutsaleAndDiscontinue( pathname="", query={}, data={}, prevData=[] ) {
    return (dispatch) => {

        const initQuery = {};
        const method = 'put';
        const search = queryString.stringify({...initQuery, ...query});
        const url = `${API()['myvendor']['product']['updateProductStatus']}${search!=""? `?${search}`:''}`;

        return Axios({method,url,data}).then(res => {
            if( !res.hasOwnProperty('response') ){

                const list = prevData['tableBodyData'].map( item => {
                    if(item['id'] == data['productToken']){
                        item['display'] = item['display']==true? false:true;
                        item['status']  = item['display']==true? 'auth':'non-display';
                    }
                    return item;
                });

                if( data['productDisplay'] ){
                    prevData['display'] = prevData['display']+1;
                    prevData['noneDisplay'] = prevData['noneDisplay']-1;
                }else{
                    prevData['display'] = prevData['display']-1;
                    prevData['noneDisplay'] = prevData['noneDisplay']+1;
                }
                
                dispatch({
                    type: "VENDOR_PRODUCT_HEAD",
                    noneDisplay: prevData['noneDisplay'],
                    display: prevData['display'],
                    review: prevData['review'],
                    total: prevData['total']
                })
                dispatch({
                    type: "VENDOR_ORDERS_LIST",
                    list
                })

                return res;
            }
            return res['response'];
        });

    }
}

// 購買方案列表
export function programsList( pathname="",query={},data={} ){
    return (dispatch) => {

        const initQuery = {};
        const method = 'get';
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API()['myvendor']['programs']['list']}${search!=""? `?${search}`:""}`;

        return Axios({method,url,data}).then(res => {
            if( !res.hasOwnProperty['response'] ){
                dispatch({
                    type: 'VENDOR_PLANFORM_LIST',
                    list: res['data']
                })
                return res;
            }
            return res['response'];
        }).catch( err => err['response']);
    }
}

// 購買方案合約書
export function contract( pathname,query={},data={} ){
    return(dispatch) => {

        const initQuery = {};
        const method = 'get';
        const search = queryString.stringify({ ...initQuery, ...query });
        const url = `${API()['payment']['contract']}${search!=""? `?${search}`:""}`;

        return Axios({method,url,data}).then( res => {
            if( !res.hasOwnProperty['response'] ){
                return res;
            }
            return res['response'];
        });
    }
}

// 購買的方案帳單列表
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
                const changeData = res['data']['list'].map( item => {
                    return{
                        id: item['orderID'],
                        orderer: item['orderName'],
                        payMethod: lang['zh-TW']['payment'][item['payMethod']], // 付款方式轉換文字
                        status: lang['zh-TW']['orderStatus'][item['orderStatus']], //item['orderStatus'],
                        total: item['amount'],
                        date: item['createTimeMs']
                    }
                })

                dispatch({
                    type: "VENDOR_BILL_STATUS",
                    status: {
                        page: res['data']['page'],
                        pages: res['data']['pages'],
                        total: res['data']['total']
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

// 購買的方案帳單詳細
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
        data: { ...api['data'], jwt_type: 'vendor'},
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