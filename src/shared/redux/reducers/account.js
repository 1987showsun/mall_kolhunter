export default function account(
    state = {
        "info": {
            celebrity: "",
            email: "",
            name: "",
            photo: ""
        }
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