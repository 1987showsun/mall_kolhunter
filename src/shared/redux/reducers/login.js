export default function login(
    state = {
        info: {},
        token: '',
        jwt_vendor: "",
        jwt_account: "",
    },action
){

    state = {
        jwt_vendor: typeof window !== 'undefined'? sessionStorage.getItem('jwt_vendor') || "" : "",
        jwt_account: typeof window !== 'undefined'? sessionStorage.getItem('jwt_account') || "" : "",
    }

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