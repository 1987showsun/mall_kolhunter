export default function home(
    state = {
        kv: [],
        latest: []
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
                latest: action.data
            };
            break;
    }
    return state;
}