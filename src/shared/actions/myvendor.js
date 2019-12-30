/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import axios              from 'axios';
import queryString        from 'query-string';
import dayjs              from 'dayjs';
import API                from './apiurl';

// Actions
import { catchError }     from './catchErrorStatus';

// Lang
import lang               from '../public/lang/lang.json';

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
            page          :1,
            limit         :30,
            sort          :'desc',
            sortBy        :'created'
        };
        const method    = 'get';
        const search    = queryString.stringify({ ...initQuery, ...query });
        const url       = `${API()['myvendor']['product']['categories']}${ search!=''? `?${search}`:'' }`;

        dispatch({
            type        : "VENDOR_PRODUCT_HEAD",
            noneDisplay : 0,
            display     : 0,
            review      : 0,
            total       : 0
        })
        dispatch({
            type        : 'VENDOR_PRODUCT_LIST',
            list        : []
        });
        
        return Axios({method,url,data}).then( res => {
            if( !res.hasOwnProperty('response') ){

                const { status, list } = res['data'];

                dispatch({
                    type                  : "VENDOR_PRODUCT_HEAD",
                    noneDisplay           : status['none-display'] || 0,
                    display               : status['display']      || 0,
                    review                : status['review']       || 0,
                    total                 : status['total']        || 0
                })
                
                dispatch({
                    type                  : 'VENDOR_PRODUCT_LIST',
                    list                  : list.map( item => {

                        const { status, images, category, display, vendorFee, created, modified } = item;
                        const categoryToText = ( arr ) => {
                            let text = "";
                            arr.forEach(( item,i ) => {
                                if( i==0 ){
                                    text = item['title'];
                                }else if( i>=arr.length-1 ){
                                    text = `${text} / ${item['title']}`;
                                }else{
                                    text = `${item['title']} / ${text}`;
                                }
                            });
                            return text;
                        }
                        const productStatus = () => {
                            return status=="none-auth"? (status):(display==true? 'auth':'non-display');
                        }

                        return{
                            ...item,
                            image              : images.find((item,i) => i==0 )['path'],
                            productStatus      : productStatus(),
                            productStatusText  : lang['zh-TW']['productStatus'][productStatus()],
                            categoryString     : category!=undefined? (categoryToText(item['category'])):("N/A"),
                            vendorFee          : (vendorFee*100),
                            createdDate        : dayjs(created).format('YYYY / MM / DD'),
                            modifiedData       : dayjs(modified).format('YYYY / MM / DD'),
                        }
                    })
                });

                return res;
            }
            catchError(res['response'])(dispatch);
            return res['response'];
        });
    }
}

// 商品新增
export function createProduct( data={}, step, method="post" ) {
    return (dispatch) => {

        const url = `${API()['myvendor']['product']['create'][step]}`;
        return Axios({ method, url, data });

    }
}

// 商品上下架
export function productPutsaleAndDiscontinue( pathname="", query={}, data={}, prevData=[] ) {
    return (dispatch) => {

        const initQuery      = {};
        const method         = 'put';
        const search         = queryString.stringify({...initQuery, ...query});
        const url            = `${API()['myvendor']['product']['updateProductStatus']}${search!=""? `?${search}`:''}`;

        return Axios({method,url,data}).then(res => {
            if( !res.hasOwnProperty('response') ){

                let   { noneDisplay, display, review, total, tableBodyData } = prevData;
                const { productToken }  = data;
                const list = tableBodyData.map(item => {
                    const { id } = item;
                    if( id==productToken ){
                        item['display']           = item['display']==true? false:true;
                        item['status']            = item['display']==true? 'auth':'non-display';
                        item['productStatus']     = item['display']==true? 'auth':'non-display';
                        item['productStatusText'] = lang['zh-TW']['productStatus'][item['status']];
                        display       = item['display']==true? display+1     : display-1;
                        noneDisplay   = item['display']==true? noneDisplay-1 : noneDisplay+1;
                    }
                    return item;
                });

                dispatch({
                    type           : "VENDOR_PRODUCT_HEAD",
                    noneDisplay    : noneDisplay,
                    display        : display,
                    review         : review,
                    total          : total
                });
                dispatch({
                    type           : "VENDOR_ORDERS_LIST",
                    list
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

        const method       = 'get';
        const initQuery    = {};
        const search       = queryString.stringify({ ...initQuery });
        const url          = `${API()['myvendor']['product']['info']}${query!=""? `?${query}`:''}`;

        return Axios({method,url,data: {}});
    }
}

// 商品刪除
export function deleteProduct( id ){
    return (dispatch)=>{

        const method       = 'delete';
        const initQuery    = {};
        const url          = `${API()['myvendor']['product']['delete']}`;

        return Axios({method,url,data: {id}}).then( res => {
            if( !res.hasOwnProperty('response') ){
                return res;
            }
            catchError(res['response'])(dispatch);
            return res['response'];
        });
    }
}

// 廠商資料
export function vinfo( method="get", data={} ){
    return (dispatch)=>{

        const initQuery    = {};
        const search       = queryString.stringify({ ...initQuery });
        const url          = `${API()['myvendor']['vinfo']}`;

        return Axios({method,url,data}).then( res => {
            if( !res.hasOwnProperty('response') ){
                dispatch({
                    type: "VENDOR_INFO",
                    payload: res['data']
                })
                return res;
            }
            catchError(res['response'])(dispatch);
            return res['response'];
        });
    }
}

// 訂單列表
export function orderList( pathname,query,data={} ) {
    return (dispatch) => {

        const method       = 'get';
        const initQuery    = {
            page: 1
        };
        const search       = queryString.stringify({ ...initQuery, ...query });
        const url          = `${API()['myvendor']['order']['list']}${search!=""? `?${search}`:""}`;

        return Axios({method,url,data}).then( res => {
            if( !res.hasOwnProperty('response') ){

                const { total, list, TotalAmount } = res['data'];

                dispatch({
                    type          : "VENDOR_ORDERS_STATUS",
                    total         : total,
                    totalAmount   : TotalAmount
                });

                dispatch({
                    type          : "VENDOR_ORDERS_LIST",
                    list          : list.map( item => {
                        const { orderStatus, orderDetail } = item;
                        let   amount = 0;
                        orderDetail.map(orderItem => {
                            amount = amount + orderItem['amount'];
                        })

                        return {
                            ...item,
                            amount       : amount,
                            statusText   : lang['zh-TW']['orderStatus'][orderStatus],
                            createdate   : dayjs(item['orderTimeMs']).format('YYYY / MM / DD hh : mm : ss')
                        }
                    })
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

        const method     = 'get';
        const initQuery  = {};
        const search     = queryString.stringify({ ...initQuery, ...query });
        const url        = `${API()['myvendor']['order']['info']}${search!=""? `?${search}`:""}`;

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
export function orderInfoProductDeliveryStatus( pathname,query,data={},source ) {
    return (dispatch) => {
        
        const method     = 'put';
        const initQuery  = {};
        const search     = queryString.stringify({ ...initQuery, ...query });
        const url        = `${API()['myvendor']['order']['delivery']}${search!=""? `?${search}`:""}`;
        
        return Axios({method,url,data}).then( res => {
            if( !res.hasOwnProperty('response') ){
                const { orderDetail } = source;
                orderDetail.map( item => {
                    if( item['id']==data['id'] ){
                        item['deliveryStatus'] = data['deliveryStatus'];
                        item['deliveryCode']   = data['deliveryCode'];
                        return item;
                    }
                })
                dispatch({
                    type: "VENDOR_ORDERS_INFO",
                    info: {...source}
                })
                return res;
            }
            return res['response'];
        });
        
    }
}

// 訂單下載
export function orderDownload( pathname,query,data={} ) {
    return (dispatch) => {

        const method     = 'get';
        const initQuery  = {};
        const search     = queryString.stringify({ ...initQuery, ...query });
        const url        = `${API()['myvendor']['order']['download']}${search!=""? `?${search}`:""}`;

        return Axios({method,url,data}).then( res => {
            if( !res.hasOwnProperty('response') ){
                return res;
            }
            return res['response'];
        });
    }
}

// 訂單退貨
export function changeRefund( pathname,query,data={},source ){
    return (dispatch) => {

        const { refundType, detail } = data;
        const initQuery      = {};
        const method         = 'post';
        const search         = queryString.stringify({ ...initQuery, ...query });
        const url            = `${API()['myvendor']['refund'][refundType]}${search!=""? `?${search}`:""}`;

        return Axios({method,url,data}).then(res => {
            if( !res.hasOwnProperty('response') ){

                const { orderDetail } = source;
                orderDetail.map( item => {
                    if(item['id'] == detail[0]){
                        item['refundStatus'] = refundType;
                    }
                })

                dispatch({
                    type: "VENDOR_ORDERS_INFO",
                    info: {...source}
                })
                return res;
            }
            return res['response'];
        });
    }
}

// 帳務列表
export function incListAccount( pathname="", query={}, data={} ) {
    return (dispatch) => {

        const YYYY        = dayjs().format('YYYY');
        const MM          = dayjs().format('MM');
        const DD          = dayjs().format('DD');
        const year        = String(YYYY);
        const month       = String(DD<=15? MM-1 : MM);
        const period      = month==String(MM)? '1': '2';
        const method      = 'get';
        const initQuery   = {
            year            : year,
            month           : month,
            period          : period
        };
        const search      = queryString.stringify({ ...initQuery, ...query });
        const url         = `${API()['myvendor']['account']['list']}${search!=""? `?${search}`:""}`;

        dispatch({
            type: 'VENDOR_ACCOUNTS_LIST',
            list: []
        });
        return Axios({method,url,data}).then( res => {
            if( !res.hasOwnProperty('response') ){


                const { income=[] } = res['data'];
                const list          = income.map( item => {

                    const { orderStatus, orderDetail, orderTimeMs } = item;
                    let   amount              = 0;
                    let   vendorFee           = 0;
                    let   totalVendorFeeSplit = 0;

                    orderDetail.forEach( orderDetailItem => {
                        vendorFee           = vendorFee + orderDetailItem['vendorFee'];
                        amount              = amount    + orderDetailItem['amount'];
                        totalVendorFeeSplit = totalVendorFeeSplit + orderDetailItem['vendorFeeSplit'];
                    })

                    return{
                        ...item,
                        amount               : amount,
                        vendorFee            : vendorFee,
                        totalVendorFeeSplit  : Math.round((totalVendorFeeSplit/orderDetail.length)*100),
                        orderStatusText      : lang['zh-TW']['orderStatus'][orderStatus],
                        orderTimeMs          : dayjs(orderTimeMs).format('YYYY / MM / DD hh : mm : ss')
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

// 購買方案列表
export function programsList( pathname="",query={},data={} ){
    return (dispatch) => {

        const initQuery     = {};
        const method        = 'get';
        const search        = queryString.stringify({ ...initQuery, ...query });
        const url           = `${API()['myvendor']['programs']['list']}${search!=""? `?${search}`:""}`;

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

        const initQuery     = {};
        const method        = 'get';
        const search        = queryString.stringify({ ...initQuery, ...query });
        const url           = `${API()['payment']['contract']}${search!=""? `?${search}`:""}`;

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
            page          : 1,
            limit         : 30,
            sort          : "desc",
            sortBy        : "created"
        };
        const method    = 'get';
        const search    = queryString.stringify({ ...initQuery, ...query });
        const url       = `${API()['myvendor']['bill']['list']}${search!=""? `?${search}`:""}`;

        return Axios({method,url,data}).then(res => {
            if( !res.hasOwnProperty('response') ){
                // 重組給 table 用的列表
                const { page, pages, total, list } = res['data'];

                dispatch({
                    type       : "VENDOR_BILL_STATUS",
                    status     : { page, pages, total }
                })
            
                dispatch({
                    type       : "VENDOR_BILL_LIST",
                    list       : list.map( item => {
                        const { payMethod, orderStatus, createTimeMs } = item;
                        return{
                            ...item,
                            methodText   : lang['zh-TW']['payment'][payMethod],
                            statusText   : lang['zh-TW']['orderStatus'][orderStatus],
                            createTimeMs : dayjs(createTimeMs).format('YYYY / MM / DD hh : mm : ss')
                        }
                    })
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

        const initQuery    = {};
        const method       = 'get';
        const search       = queryString.stringify({ ...initQuery, ...query });
        const url          = `${API()['myvendor']['bill']['info']}${search!=""? `?${search}`:""}`;

        dispatch({
            type         : "VENDOR_BILL_INFO",
            info         : []
        });

        return Axios({method,url,data}).then(res => {
            if( !res.hasOwnProperty('response') ){
                const { payMethod, orderStatus, createTimeMs, verifyTimeMs } = res['data'];
                dispatch({
                    type       : "VENDOR_BILL_INFO",
                    info       : { 
                        ...res['data'],
                        methodText   : lang['zh-TW']['payment'][payMethod],
                        statusText   : lang['zh-TW']['orderStatus'][orderStatus],
                        createTimeMs : dayjs(createTimeMs).format('YYYY / MM / DD'),
                        verifyTimeMs : dayjs(verifyTimeMs).format('YYYY / MM / DD'),
                    }
                })
                return res;
            }
            return res['response'];
        });
    }
}

const Axios = ( api ) => {
    return axios({
        method    : api['method'],
        url       : api['url'],
        data      : { ...api['data'], jwt_type: 'vendor'},
        headers   : {
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