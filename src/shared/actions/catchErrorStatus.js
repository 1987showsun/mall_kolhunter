// Actions
import { clearToken } from './login';

export function catchError( response={}, type="vendor" ){
    const { status } = response;
    return (dispatch)=>{
        switch( status ){
            case 401:
                clearToken(type)(dispatch);
                break;

            case 403:
                break;
        }
    }
}