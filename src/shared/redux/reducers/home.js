export default function home(
    state = {
        kv          : []
    },action
){
    switch(action.type){
        case 'HOME_KV':
            state = { ...state, kv: action.payload };
            break;
    }
    return state;
}