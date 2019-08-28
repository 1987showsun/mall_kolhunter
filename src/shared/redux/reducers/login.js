export default function login(
    state = {
        info_vendor: {},
        info_account: {},
        jwt_vendor: "",
        jwt_account: "",
    },action
){

    state = {
        jwt_vendor: typeof window !== 'undefined'? sessionStorage.getItem('jwt_vendor') || "" : "",
        jwt_account: typeof window !== 'undefined'? sessionStorage.getItem('jwt_account') || "" : "",
    }

    switch(action.type){
        case 'CLEAR_ACCOUNT_JWT_TOKEN':
            state = { 
                ...state, 
                jwt_account: action.token
            };
            break;

        case 'ACCOUNT_SIGNIN_SUCCESS':
            state = {
                ...state,
                jwt_account: action.token
            }
            break;

        case 'VENDOR_SIGNIN_SUCCESS':
            state = {
                ...state,
                jwt_vendor: action.token
            }
            break;
    }
    return state;
}