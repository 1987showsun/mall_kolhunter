export default function categories(
    state = {
        total: 0,
        limit: 30,
        current: 1,
        totalPages: 1,
        list: [],
    },action
){
    switch(action.type){

        case 'CATRGORIES_STATUS':
            state = { 
                ...state,
                total: action.total,
                limit: action.limit,
                current: action.current,
                totalPages: action.totalPages
            }
            break;

        case 'VENDOR_CATRGORIES_LIST':
            state = { 
                ...state,
                list: action.list,
            };
            break;

        case 'CATRGORIES_PRODUCT_LIST':
            state = { 
                ...state,
                list: action.list,
            };
            break;
    }
    return state;
}