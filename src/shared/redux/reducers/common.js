export default function common(
    state = {
        deliveries: []
    },action
){
    switch(action.type){
        case 'HOME_KV':
            state = { ...state, kv: action.payload };
            break;
    }
    return state;
}