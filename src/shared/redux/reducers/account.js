export default function account(
    state = {
        "info": {}
    },action
){
    switch(action.type){
        case 'ACCOUNT_INFO':
            state = { 
                ...state, 
                info: action.info
            };
            break;
    }
    return state;
}