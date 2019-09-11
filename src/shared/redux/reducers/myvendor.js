export default function vendor(
    state = {
        "total": 0,
        "on_shelves": 0,
        "no_longer_be_sold": 0,
        "to_be_shipped_area": 4,
        "on_passage": 10,
        "auth": 0, // 上架總數
        "nonDisplay": 0, // 下架總數
        "noneAuth": 0, // 審核總數
        "successful_delivery": 10,
        "cancel": 4,
        "return": 2,
        "info": {},
        "productStatus": {
            "total": 0,
            "auth": 0,
            "nonDisplay": 0,
            "noneAuth": 0
        },
        "productList": [],
        "accountsStatus": {
            total: 0,
            page: 1,
        },
        "accountsList": [],
        "orderStatus": {
            total: 0,
            totalAmount: 0,
            page: 1
        },
        "orderList": [],
        "billStatus": {
            page: 1,
            pages: 1,
            total: 0
        },
        "billList": [],
        "billInfo": []
    },action
){
    switch(action.type){
        case 'LOGIN_SUCCESS':
            state = { 
                ...state, 
                info: action.info,
                token: action.token
            };
            break;

        case 'VENDOR_ACCOUNTS_LIST':
            state = {
                ...state,
                accountsList: action.list
            }
            break;

        case 'VENDOR_PRODUCT_HEAD':
            state = {
                ...state,
                productStatus: {
                    ...state['productStatus'],
                    "total": action.total,
                    "auth": action.auth,
                    "nonDisplay": action.nonDisplay,
                    "noneAuth": action.noneAuth
                }
            }
            break;
        
        case 'VENDOR_PRODUCT_LIST':
            state = {
                ...state,
                productList: action.list
            }
            break;

        case 'VENDOR_INFO':
            state = {
                ...state,
                info: action.payload
            }
            break;

        case 'VENDOR_ORDERS_STATUS':
                state = {
                    ...state,
                    orderStatus: {
                        ...state['orderStatus'],
                        total: action.total,
                        totalAmount: action.totalAmount
                    }
                }
                break;
        
        case 'VENDOR_ORDERS_LIST':
            state = {
                ...state,
                orderList: action.list
            }
            break;

        case 'VENDOR_BILL_STATUS':
            state = {
                ...state,
                billStatus: { ...state.billStatus, ...action.status}
            }
            break;

        case 'VENDOR_BILL_LIST':
            state = {
                ...state,
                billList: action.list
            }
            break;

        case 'VENDOR_BILL_INFO':
            state = {
                ...state,
                billInfo: action.info
            }
            break;
    }
    return state;
}