export default function account(
    state = {
        "info": {},
        "cartToken": "",
        "cartTotalAmount": 0,
        "cartItems": [],
        "orderStatus": {
            page: 1,
            pages: 1,
            total: 0
        },
        "orderList": []
    },action
){
    switch(action.type){
        case 'ACCOUNT_INFO':
            state = { 
                ...state, 
                info: action.info
            };
            break;

        case 'ACCOUNT_CART_ITEMS':
            state = {
                ...state,
                cartToken: action.cartToken,
                cartTotalAmount: action.cartTotalAmount,
                cartItems: action.list
            }
            break;

        case 'ACCOUNT_ORDERS_STATUS':
            state = {
                ...state,
                orderStatus: {
                    ...state.orderStatus,
                    ...action
                }
            }
            break;

        case 'ACCOUNT_ORDERS_LIST':
            state = {
                ...state,
                orderList: action.list
            }
            break;
    }
    return state;
}