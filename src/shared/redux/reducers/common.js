export default function common(
    state = {
        cartID: "",
        deliveries: []
    },action
){
    state['cartID'] = typeof window!=='undefined'? sessionStorage.getItem('cart_id')||"" : "";
    switch(action.type){
        case 'HOME_KV':
            state = { ...state, kv: action.payload };
            break;

        case 'CART_ID':
            state = { ...state, cartID: action.cartID };
            break;
    }
    return state;
}