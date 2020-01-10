/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

//  Images
import kvNullImage                     from '../../public/images/init/1000x427initKvImages.jpg';
import nullImages                      from '../../public/images/init/420x420initBlockImages.jpg';

export default function store(
    state = {
        total           : 0,
        totalPages      : 1,
        limit           : 30,
        current         : 1,
        list            : [],
        product         : [],
        info            : {
            cover         : kvNullImage,
            photo         : nullImages,
            name          : "",
            description   : ""
        }
    },action
){
    switch(action.type){

        case 'STORE_STATUS':
            state = { 
                ...state,
                total       : action.total,
                limit       : action.limit,
                current     : action.current,
                totalPages  : action.totalPages
            }
            break;

        case 'CATRGORIES_STORE_LIST':
            state = { 
                ...state,
                list        : action.list,
            };
            break;

        case 'STORE_PRODUCT':
            state = { 
                ...state,
                product     : action.list,
            };
            break;

        case 'STORE_INFO':
            state = { 
                ...state,
                info        : {...state.info, ...action.info},
            };
            break;

        default:
            break;
    }
    return state;
}