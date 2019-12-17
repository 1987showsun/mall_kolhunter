/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

export default function home(
    state = {
        limit    : 30,
        total    : 0,
        list     : [],
    },action
){
    switch(action.type){
        case 'COLLECTIONS_LIST':
            state = { 
                ...state, 
                list: action.list
            };
            break;
    }
    return state;
}