/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

export default function home(
    state = {
        kv                    : [],
        latest                : [],
        latestTotal           : 0,
        latestLimit           : 30,
        recommendStoreList    : []
    },action
){
    switch(action.type){
        case 'HOME_KV':
            state = { 
                ...state, 
                kv: action.data
            };
            break;

        case 'HOME_LATEST':
            state = { 
                ...state,
                latest         : action.list,
                latestTotal    : action.total,
                latestLimit    : action.limit
            };
            break;

        case 'HOME_RECOMND_STORE':
            state = {
                ...state,
                recommendStoreList: action.list
            }
    }
    return state;
}