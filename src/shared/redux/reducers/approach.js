/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

export default function approach(
    state = {
        adult              : false,
        combo              : false,
        onSale             : false,
        token              : "",
        name               : "",
        categories         : [],
        celebrityNum       : 0,
        images             : [],
        description        : [],
        delivery           : [],
        spec               : [],
        price              : 0,
        sellPrice          : 0
    },action
){
    switch(action.type){
        case 'PRODUCT_INFO':
            state = { 
                ...state,
                adult              : action.adult,
                combo              : action.combo,
                onSale             : action.onSale,
                token              : action.token,
                name               : action.name,
                categories         : action.categories,
                celebrityNum       : action.celebrityNum,
                images             : action.images,
                description        : action.description,
                delivery           : action.delivery,
                spec               : action.spec,
                price              : action.price,
                sellPrice          : action.sellPrice
            }
            break;
    }
    return state;
}