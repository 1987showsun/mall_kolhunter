export default function home(
    state = {
        kv: [],
        latest: [],
        recommendStoreList: []
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
                latest: action.list
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