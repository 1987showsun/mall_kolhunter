/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import axios from 'axios';

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return error;
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const status = error['response']['status'];
    switch( status ){
        case 401:
            alert('該帳號已有其他電腦正在使用，請重新登入廠商管理系統。');
            // const jwt_type = JSON.parse(error['response']['config']['data'])['jwt_type'];
            // const jwt_token = sessionStorage.getItem(`jwt_${jwt_type}`);
            // const url = API()[`my${jwt_type}`]['refreshToken']
        
            // return axios({
            //     method: 'get',
            //     url: url,
            //     data: {},
            //     headers:{
            //         authorization: jwt_token
            //     }
            // }).then( res => {
            //     const token = res['data'];
            //     sessionStorage.setItem(`jwt_${jwt_type}`,token);
            //     error.response.config.headers['authorization'] = token;
            //     return axios(error.response.config);
            // });
        
        default:
            return Promise.reject(error);
    } 
});

const API_ADDRESS = () => {
    const { NODE_ENV } = process.env;
    let API_PATH  = 'https://api.kolhunter.com';
    if( NODE_ENV=="development" ){
        API_PATH  = "https://sapi.kolhunter.com"; //'https://dapi.kolhunter.com';//
    }
    return API_PATH;
}

export default function API(){
    return {
        'signin'         : {
            'account'      : `${API_ADDRESS()}/v1/member/login`,
            'vendor'       : `${API_ADDRESS()}/v1/vendor/login`
        },
        'signup'         : {
            'account'      : `${API_ADDRESS()}/v1/member/signup`,
            'vendor'       : `${API_ADDRESS()}/v1/vendor/signup`
        },
        'forget'         : {
            'account'      : `${API_ADDRESS()}/v1/member/resetpassword`,
            'vendor'       : `${API_ADDRESS()}/v1/vendor/resetpassword`
        },
        'reset_password' : {
            'account'      : `${API_ADDRESS()}/v1/member/resetpassword`,
            'vendor'       : `${API_ADDRESS()}/v1/vendor/resetpassword`,
        },
        'verify'         : {
            'account'      : `${API_ADDRESS()}/v1/member/verifyemail`,
            'vendor'       : `${API_ADDRESS()}/v1/vendor/verifyemail`
        },
        'resend'         : {
            'account'      : `${API_ADDRESS()}/v1/member/resendverifyemail`,
            'vendor'       : `${API_ADDRESS()}/v1/vendor/resendverifyemail`
        },
        'myvendor'       : {
            'refreshToken'            : `${API_ADDRESS()}/v1/vendor/renewtoken`,
            "productCategories"       :`${API_ADDRESS()}/v1/vendor/categories`,
            'product'    : {
                'categories'          : `${API_ADDRESS()}/v1/vendor/product/list`,
                'create'              : { // 創建商品
                    '1'                 : `${API_ADDRESS()}/v1/vendor/product`, // 第一步驟 ： 商品基本資料
                    '2'                 : `${API_ADDRESS()}/v1/vendor/product/img`, // 第二步驟 ： 商品圖片
                    '3'                 : `${API_ADDRESS()}/v1/vendor/product/spec`, // 第三步驟 ： 商品規格
                    '4'                 : `${API_ADDRESS()}/v1/vendor/product/desc`, // 第四步驟 ： 商品敘述
                    '5'                 : `${API_ADDRESS()}/v1/vendor/product/delivery`, // 第五步驟 ： 運送方式
                },
                'put'                 : `${API_ADDRESS()}/v1/vendor/product`,
                'info'                : `${API_ADDRESS()}/v1/vendor/product`, // 
                'delete'              : `${API_ADDRESS()}/v1/vendor/product`, //
                'putsale'             : `${API_ADDRESS()}/v1/vendor/putsale`, // put 廠商商品上架 { product_id }
                'discontinue'         : `${API_ADDRESS()}/v1/vendor/discontinue`, // put 廠商商品下架 { product_id }
                'updateProductStatus' : `${API_ADDRESS()}/v1/vendor/product/status`
            },
            'order'                   : {
                'list'                  : `${API_ADDRESS()}/v1/vendor/orders`, //
                'categories'            : `${API_ADDRESS()}/v1/vendor/orders`, // get
                'info'                  : `${API_ADDRESS()}/v1/vendor/order/info`, // get 
                'delivery_list'         : `${API_ADDRESS()}/v1/order/delivery/list`, // get 取得運送狀態列表
                'status_list'           : `${API_ADDRESS()}/v1/order/status/list`, // get 取得訂單狀態列表 
                'delivery'              : `${API_ADDRESS()}/v1/vendor/order/delivery`, // post 訂單運送狀態改變 { order_item_id, status }
                'delivery_bulk'         : `${API_ADDRESS()}/v1/vendor/order/delivery/bulk`, // put
                'status'                : `${API_ADDRESS()}/v1/vendor/order/status`, // post 訂單狀態改變 { order_item_id, status }
                'download'              : `${API_ADDRESS()}/v1/vendor/orders/download` // 報表下載
            },
            'review'                  : {
                'categories'            : `${API_ADDRESS()}/v1/vendor/product/list`,
            },
            'vinfo'                   : `${API_ADDRESS()}/v1/vendor/info`, // get 廠商基本資料
            'updatePWD'                 : `${API_ADDRESS()}/v1/vendor/password`, // put 修改密碼
            'bill'                    : {
                'list'                  : `${API_ADDRESS()}/v1/vendor/purchase`, // 廠商購買的方案帳單
                'info'                  : `${API_ADDRESS()}/v1/order/info`, // get 訂單明細
            },
            'programs'                : {
                'list'                  : `${API_ADDRESS()}/v1/vendor/programs`,
            },
            'account'                 : { // 對帳報表
                'list'                  : `${API_ADDRESS()}/v1/vendor/financial/report`, // get 對帳列表
            },
            'refund'                  : {
                'delivery'              : `${API_ADDRESS()}/v1/vendor/order/refund/delivery`,
                'recived'               : `${API_ADDRESS()}/v1/vendor/order/refund/recived`,
                'approve'               : `${API_ADDRESS()}/v1/vendor/order/refund/approve`,
                'reject'                : `${API_ADDRESS()}/v1/vendor/order/refund/reject`
            }
        },
        'myaccount'                   : {
            'refreshToken'              : `${API_ADDRESS()}/v1/member/renewtoken`,
            'info'                      : `${API_ADDRESS()}/v1/member/info`, // get 拿取會員資料
            'carts'                     : `${API_ADDRESS()}/v1/shop/cart`, // get 取得購物車 ID
            'updateInfo'                : `${API_ADDRESS()}/v1/member/info`, // put 修改會員資料
            'updateBankInfo'            : `${API_ADDRESS()}/v1/member/bankinfo`, // put 修改會員銀行轉帳資料
            'updatePWD'                 : `${API_ADDRESS()}/v1/member/password`, // put 修改密碼
            'removeCartItem'            : `${API_ADDRESS()}/v1/shop/cart`, // delete 刪除購物車內單一商品
            'updateCartItem'            : `${API_ADDRESS()}/v1/shop/cart`, // put 修改購物車內單一商品：數量、運送方式
            'orders'                    : {
                'list'                    : `${API_ADDRESS()}/v1/order/list`, // get 訂單列表
                'info'                    : `${API_ADDRESS()}/v1/order/info`, // get 訂單明細
                'refund'                  : `${API_ADDRESS()}/v1/pay/request/refund` // post 退貨
            }
        },
        'mystore'                     : {
            'getInfo'                   : `${API_ADDRESS()}/v1/store/info`, // get 店舖管理資訊
            'updateInfo'                : `${API_ADDRESS()}/v1/store/info`, // put 修改店舖管理資訊
            'candidates'                : `${API_ADDRESS()}/v1/product/candidates`, // get 取得可販賣商品
            'storeProductList'          : `${API_ADDRESS()}/v1/store/products`, // get 取得目前以販賣商品
            'addProduct'                : `${API_ADDRESS()}/v1/store/products`, // post 網紅新增要賣的商品
            'deleteProduct'             : `${API_ADDRESS()}/v1/store/products`, // delete 網紅要移出販賣此商品
            'bank'                      : `${API_ADDRESS()}/v1/store/bank`, // get or put 取得與修改銀行資訊
            'fansorders'                : `${API_ADDRESS()}/v1/store/profit`, // get 店舖分潤資訊 
            'profitInfo'                : `${API_ADDRESS()}/v1/store/profit` // get 分潤資訊
        },
        'coupon'                      : {
            'check'                     : `${API_ADDRESS()}/v1/pay/coupon`
        },
        'delivery'                    : {
            'list'                      : `${API_ADDRESS()}/v1/mall/deliveries` // get 運送方式
        },
        'categories'                  : {
            'list'                      : `${API_ADDRESS()}/v1/category/list` // get 分類列表
        },
        'shopping'                    : { // 購物
            'cartID'                    : `${API_ADDRESS()}/v1/shop/cart/init`
        },
        'mall'                        : { // 賣場
            'home'                      : {
                'kv'                      : `${API_ADDRESS()}/v1/mall/banner`, // get 輪播banner
                'latest'                  : `${API_ADDRESS()}/v1/product/bucket` // get 最新商品
            },
            'product'                   : {
                'list'                    : `${API_ADDRESS()}/v1/product/bucket`, // get 商品列表 威廉開發
                'detail'                  : `${API_ADDRESS()}/v1/product/info`
            },
            'store'                     : {
                'list'                    : `${API_ADDRESS()}/v1/store/list`, // get 店舖列表
                'product'                 : `${API_ADDRESS()}/v1/product/bucket`, // get 店鋪商品
                'recommend'               : `${API_ADDRESS()}/v1/store/recommend`, // get 推薦網紅店舖
                'info'                    : `${API_ADDRESS()}/v1/store/info`,
                'sales'                   : `${API_ADDRESS()}/v1/store/sales`,
            }
        },
        "payment"                     : {
            "contract"                  : `${API_ADDRESS()}/v1/vendor/contract`,// get 合約
            "addOrder"                  : `${API_ADDRESS()}/v1/pay/init`, // post 建立訂單
            "checkout"                  : `${API_ADDRESS()}/v1/pay/checkout`, // post 結帳
            "verifier"                  : `${API_ADDRESS()}/pay/verifier`, // 第三方驗證
            "result"                    : `${API_ADDRESS()}/v1/pay/result` // 付款結果
        }
    }
}