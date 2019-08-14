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
        'delivery': {
            'list': `${API_ADDRESS(NODE_ENV)}/v1/mall/deliveries`
        },
        'categories': {
            'list': `${API_ADDRESS(NODE_ENV)}/v1/mall/categories`,
            'mall': `${API_ADDRESS(NODE_ENV)}/v1/mall/categories`
        },
        'shopping': {
            'cartID': `${API_ADDRESS(NODE_ENV)}/v1/shop/cart/init`
        },
        'mall': {
            'home': {
                'kv': `${API_ADDRESS(NODE_ENV)}/v1/mall/banner`,
                'latest': `${API_ADDRESS(NODE_ENV)}/v1/mall/product/latest`
            },
            'product': {
                'list': `${API_ADDRESS(NODE_ENV)}/v1/mall/product/list`
            },
            'store': {
                'list': `${API_ADDRESS(NODE_ENV)}/v1/mall/store/list`
            }
        }
    }
}