export default function login(
    state = {
        info: {},
        token: ''
    },action
){
    switch(action.type){
        case 'USER_SIGNIN_SUCCESS':
            state = { 
                ...state, 
                token: action.token
            };
            break;

        case 'CLEAR_JWT_TOKEN':
            state = { 
                ...state, 
                token: action.token
            };
            break;
    }
    return state;
}