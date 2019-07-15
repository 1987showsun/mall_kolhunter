import axios from 'axios';
import API from './apiurl';

export function incListProduct( form ) {
    return (dispatch) => {

        dispatch({
            type: "INC_PRODUCT_HEAD",
            total: 10,
            on_shelves: 6,
            no_longer_be_sold: 4,
            number_of_shelves_available: 10
        })

        dispatch({
            type: 'INC_CATEGORIES_LIST',
            list: [
                {
                    id: '001',
                    status: 1,
                    cover: 'https://cf.shopee.tw/file/7f45df53d871582bfa8434b1db2af16d',
                    name: 'SONY SRS-XB12 EXTRA BASS 藍牙喇叭 續航力16小時 [免運 台灣索尼公司貨]',
                    brand: 'SONY',
                    store: 100,
                    price: 2950,
                    special_offer: 1950,
                    divided: 75
                },
                {
                    id: '002',
                    status: 0,
                    cover: 'https://cf.shopee.tw/file/2ee6f809dedd90ad635bf02b436cafac',
                    name: 'NewQ 32型護眼低藍光高畫質LED液晶顯示器 32NQ-VF1(只送不裝)',
                    brand: 'HERAN',
                    store: 21,
                    price: 4990,
                    special_offer: 3990,
                    divided: 85
                },
                {
                    id: '003',
                    status: 2,
                    cover: 'https://cf.shopee.tw/file/43356b35f3a2da0b43b3dd0f62b80032',
                    name: '特價一周☆ Stussy 短T 短袖T恤 經典刺繡Logo 純棉 圓領 短Tee 情侶款男女生潮T 班服 GL519',
                    brand: 'Stussy',
                    store: 82,
                    price: 429,
                    special_offer: 229,
                    divided: 90
                }
            ]
        })
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