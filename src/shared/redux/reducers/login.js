export default function login(
    state = {
        info: {},
        token: ''
    },action
){
    switch(action.type){
        case 'LOGIN_SUCCESS':
            state = { 
                ...state, 
                info: action.info,
                token: action.token
            };
            break;
    }
    return state;
}