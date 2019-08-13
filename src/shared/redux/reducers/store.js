export default function store(
    state = {
        total: 0,
        limit: 30,
        current: 1,
        list: [],
    },action
){
    switch(action.type){

        case 'STORE_STATUS':
            state = { 
                ...state,
                total: action.total,
                limit: action.limit,
                current: action.current
            }
            break;

        case 'CATRGORIES_STORE_LIST':
            state = { 
                ...state,
                list: action.list,
            };
            break;
    }
    return state;
}