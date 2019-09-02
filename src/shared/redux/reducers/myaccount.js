export default function account(
    state = {
        "info": {},
        "cartToken": "",
        "cartTotalAmount": 0,
        "cartItems": []
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
    }
    return state;
}