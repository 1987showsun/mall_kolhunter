export default function common(
    state = {
        cartID: "",
        deliveries: [],
        categoriesList: [],
        
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

        case 'MALL_CATEGORIES_LIST':
            state = { 
                ...state, 
                categoriesList: action.list 
            };
            break;

        case 'MALL_DELIVERY_LIST':
            state = {
                ...state,
                deliveries: action.list
            }
            break;
    }
    return state;
}