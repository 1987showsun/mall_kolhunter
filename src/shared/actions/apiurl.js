import axios from 'axios';
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return error;
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

const API_ADDRESS = (NODE_ENV) => {
    NODE_ENV = NODE_ENV || 'development';
    if( process.env.NODE_ENV_DEV==true || NODE_ENV=="development" ){
        return "https://sapi.kolhunter.com";
    }else{
        return  "";
    }
}

export default function API( NODE_ENV ){
    return {
        'signin': {
            'account': `${API_ADDRESS(NODE_ENV)}/v1/member/login`,
            'vendor': `${API_ADDRESS(NODE_ENV)}/v1/vendor/login`
        },
        'signup': {
            'account': `${API_ADDRESS(NODE_ENV)}/v1/member/signup`,
            'vendor': `${API_ADDRESS(NODE_ENV)}/v1/vendor/signup`
        },
        'forget': {
            'account': `${API_ADDRESS(NODE_ENV)}/v1/member/reset_password`,
            'vendor': `${API_ADDRESS(NODE_ENV)}/v1/vendor/reset_password`
        },
        'reset_password': {
            'account': `${API_ADDRESS(NODE_ENV)}/v1/member/password`,
            'vendor': `${API_ADDRESS(NODE_ENV)}/v1/vendor/password`
        },
        'verify': {
            'account': `${API_ADDRESS(NODE_ENV)}/v1/member/verify`,
            'vendor': `${API_ADDRESS(NODE_ENV)}/v1/vendor/verify`
        },
        'myvendor': {
            "productCategories":`${API_ADDRESS(NODE_ENV)}/v1/vendor/categories`,
            'product': {
                'categories': `${API_ADDRESS(NODE_ENV)}/v1/vendor/product/list`,
                'create': {
                    '1': `${API_ADDRESS(NODE_ENV)}/v1/vendor/product`,
                    '2': `${API_ADDRESS(NODE_ENV)}/v1/vendor/product/img`,
                    '3': `${API_ADDRESS(NODE_ENV)}/v1/vendor/product/spec`,
                    '4': `${API_ADDRESS(NODE_ENV)}/v1/vendor/product/desc`,
                    '5': `${API_ADDRESS(NODE_ENV)}/v1/vendor/product/delivery`,
                },
                'put': `${API_ADDRESS(NODE_ENV)}/v1/vendor/product`,
                'info': `${API_ADDRESS(NODE_ENV)}/v1/vendor/product`, // 
                'delete': `${API_ADDRESS(NODE_ENV)}/v1/vendor/product`, //
                'putsale': `${API_ADDRESS(NODE_ENV)}/v1/vendor/putsale`, // put 廠商商品上架 { product_id }
                'discontinue': `${API_ADDRESS(NODE_ENV)}/v1/vendor/discontinue`, // put 廠商商品下架 { product_id }
            },
            'order': {
                'categories': `${API_ADDRESS(NODE_ENV)}/v1/vendor/orders`,
                'info': `${API_ADDRESS(NODE_ENV)}`,
                'delivery_list': `${API_ADDRESS(NODE_ENV)}/v1/order/delivery/list`, // get 取得運送狀態列表
                'status_list': `${API_ADDRESS(NODE_ENV)}/v1/order/status/list`, // get 取得訂單狀態列表 
                'delivery': `${API_ADDRESS(NODE_ENV)}/v1/vendor/order/delivery`, // post 訂單運送狀態改變 { order_item_id, status }
                'status': `${API_ADDRESS(NODE_ENV)}/v1/vendor/order/status` // post 訂單狀態改變 { order_item_id, status }
            },
            'account': {
                'categories': `${API_ADDRESS(NODE_ENV)}`,
                'create': `${API_ADDRESS(NODE_ENV)}`,
                'info': `${API_ADDRESS(NODE_ENV)}`
            },
            'review': {
                'categories': `${API_ADDRESS(NODE_ENV)}/v1/vendor/product/list`,
            },
            'vinfo': `${API_ADDRESS(NODE_ENV)}/v1/vendor/info`
        },
        'myaccount': {
            'info': `${API_ADDRESS(NODE_ENV)}/v1/member/info`
        },
        'mystore': {
            'storeProductList': `${API_ADDRESS(NODE_ENV)}/v1/store/products`,
            'addProduct': `${API_ADDRESS(NODE_ENV)}/v1/store/products`, // post 網紅新增要賣的商品
            'deleteProduct': `${API_ADDRESS(NODE_ENV)}/v1/store/products`, // delete 網紅要移出販賣此商品
            'salesInfo': `${API_ADDRESS(NODE_ENV)}/v1/store/sales` // get 店舖銷售銷售資訊
        },
        'delivery': {
            'list': `${API_ADDRESS(NODE_ENV)}/v1/mall/deliveries` // get 運送方式
        },
        'categories': {
            'list': `${API_ADDRESS(NODE_ENV)}/v1/mall/categories` // get 分類列表
        },
        'shopping': { // 購物
            'cartID': `${API_ADDRESS(NODE_ENV)}/v1/shop/cart/init`
        },
        'mall': { // 賣場
            'home': {
                'kv': `${API_ADDRESS(NODE_ENV)}/v1/mall/banner`, // get 輪播banner
                'latest': `${API_ADDRESS(NODE_ENV)}/v1/mall/product/latest` // get 最新商品
            },
            'product': {
                'list': `${API_ADDRESS(NODE_ENV)}/v1/mall/product/list` // get 商品列表
            },
            'store': {
                'list': `${API_ADDRESS(NODE_ENV)}/v1/mall/store/list`, // get 店舖列表
                'product': `${API_ADDRESS(NODE_ENV)}/v1/store/products`, // get 店鋪商品
                'recommend': `${API_ADDRESS(NODE_ENV)}/v1/store/recommend`, // get 推薦網紅店舖
                'salesInfo': `${API_ADDRESS(NODE_ENV)}/v1/store/sales` // get 店舖銷售銷售資訊
            }
        }
    }
}