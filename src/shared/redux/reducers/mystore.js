export default function mystore(
    state = {
        info: {},
        total: 0,
        limit: 30,
        current: 1,
        list: [],
    },action
){
    switch(action.type){
        case 'MYSTORE_STOREPRODUCT_STATUS':
            state = { 
                ...state,
                total: action.total,
                limit: action.limit,
                current: action.current
            }
            break;

        case 'MYSTORE_STOREPRODUCT_LIST':
            state = { 
                ...state,
                list: action.list,
            };
            break;

        case 'MYSTORE_STORE_INFO':
            state = {
                ...state,
                info: action.info
            }

    }
    return state;
}