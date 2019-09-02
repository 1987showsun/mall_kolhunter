export default function approach(
    state = {
        token: "",
        name: "",
        celebrityNum: 0,
        images: [],
        description: [],
        delivery: [],
        spec: [],
        onSale: false,
        price: 0,
        sellPrice: 0
    },action
){
    switch(action.type){
        case 'PRODUCT_INFO':
            state = { 
                ...state,
                token: action.token,
                name: action.name,
                celebrityNum: action.celebrityNum,
                images: action.images,
                description: action.description,
                delivery: action.delivery,
                spec: action.spec,
                onSale: action.onSale,
                price: action.price,
                sellPrice: action.sellPrice
            }
            break;
    }
    return state;
}