import axios from 'axios';
import API from './apiurl';

export function listProduct() {
    return (dispatch) => {

        // dispatch({
        //     type: "INC_PRODUCT_HEAD",
        //     total: 10,
        //     on_shelves: 6,
        //     no_longer_be_sold: 4
        // })

        // dispatch({
        //     type: 'INC_CATEGORIES_LIST',
        //     list: [
        //         {
        //             id: '001',
        //             status: 1,
        //             cover: 'https://cf.shopee.tw/file/7f45df53d871582bfa8434b1db2af16d',
        //             name: 'SONY SRS-XB12 EXTRA BASS 藍牙喇叭 續航力16小時 [免運 台灣索尼公司貨]',
        //             brand: 'SONY',
        //             store: 100,
        //             price: 2950,
        //             special_offer: 1950,
        //             divided: 75
        //         },
        //         {
        //             id: '002',
        //             status: 0,
        //             cover: 'https://cf.shopee.tw/file/2ee6f809dedd90ad635bf02b436cafac',
        //             name: 'NewQ 32型護眼低藍光高畫質LED液晶顯示器 32NQ-VF1(只送不裝)',
        //             brand: 'HERAN',
        //             store: 21,
        //             price: 4990,
        //             special_offer: 3990,
        //             divided: 85
        //         },
        //         {
        //             id: '003',
        //             status: 0,
        //             cover: 'https://cf.shopee.tw/file/43356b35f3a2da0b43b3dd0f62b80032',
        //             name: '特價一周☆ Stussy 短T 短袖T恤 經典刺繡Logo 純棉 圓領 短Tee 情侶款男女生潮T 班服 GL519',
        //             brand: 'Stussy',
        //             store: 82,
        //             price: 429,
        //             special_offer: 229,
        //             divided: 90
        //         },
        //         {
        //             id: '004',
        //             status: 2,
        //             cover: 'https://s.yimg.com/ut/api/res/1.2/zedSTait9Wc4nK3Kc6ML.A--~B/YXBwaWQ9eXR3bWFsbDtjYz0zMTUzNjAwMDtoPTYwMDtxPTgxO3c9NjAw/https://s.yimg.com/fy/2fb8/item/p0530141053997-item-4686xf4x0400x0400-m.jpg',
        //             name: 'acer One S1003-1641 10吋四核心變形觸控筆電',
        //             brand: 'acer',
        //             store: 10,
        //             price: 8840,
        //             special_offer: 6840,
        //             divided: 50
        //         },
        //         {
        //             id: '005',
        //             status: 2,
        //             cover: 'https://s.yimg.com/zp/MerchandiseImages/22E76BC0BE-SP-6241312.jpg',
        //             name: 'Apple iPhone 8 64G 4.7吋 智慧型手機',
        //             brand: 'Apple',
        //             store: 5,
        //             price: 19999,
        //             special_offer: 20999,
        //             divided: 95
        //         },
        //         {
        //             id: '006',
        //             status: 2,
        //             cover: 'https://s.yimg.com/zp/MerchandiseImages/F61EA398A4-SP-6872886.jpg',
        //             name: 'Apple AirPods藍芽耳機 全新2019款(不具備無線充電盒款)-第2代',
        //             brand: 'Apple',
        //             store: 82,
        //             price: 5590,
        //             special_offer: 5290,
        //             divided: 98
        //         },
        //         {
        //             id: '007',
        //             status: 2,
        //             cover: 'https://s.yimg.com/zp/images/0424C2B2E7113BAA5AB3292784BE9219AC7C207D',
        //             name: 'Rimowa Topas 20吋標準四輪登機箱 923.52.00.4',
        //             brand: 'Rimowa',
        //             store: 82,
        //             price: 33820,
        //             special_offer: 30820,
        //             divided: 99
        //         }
        //     ]
        // })

        const method = 'get';
        const url = API()['myvendor']['product']['categories'];
        Axios({method,url,data: {}}).then( res => {
            console.log( res );
        });
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
export function createProduct( type, formObject, step ) {
    return (dispatch) => {
        const method = 'post';
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
    });
}