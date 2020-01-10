/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

// Javascripts
import { initStore, initKv, initProduct }                 from '../../public/javascripts/initData';


export default function home(
    state = {
        kv                    : initKv(),
        recommendStoreList    : initStore(),
        latest                : initProduct(),
        latestTotal           : 0,
        latestLimit           : 30
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
            break;
    }
    return state;
}