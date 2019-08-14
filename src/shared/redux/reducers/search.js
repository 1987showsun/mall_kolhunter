export default function search(
    state = {
        total: 0,
        limit: 30,
        current: 1,
        list: [],
    },action
){
    switch(action.type){

        case 'SEARCH_STATUS':
            state = { 
                ...state,
                total: action.total,
                limit: action.limit,
                current: action.current
            }
            break;

        case 'SEARCH_LIST':
            state = { 
                ...state,
                list: action.list,
            };
            break;
    }
    return state;
}