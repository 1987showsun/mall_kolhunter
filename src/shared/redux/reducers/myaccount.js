export default function account(
    state = {
        "info": {},
        "cartToken": "",
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
                cartItems: action.list
            }
            break;
    }
    return state;
}