export default function inc(
    state = {
        total: 0,
        on_shelves: 0,
        no_longer_be_sold: 0,
        number_of_shelves_available: 0,
        to_be_shipped_area: 4,
        on_passage: 10,
        successful_delivery: 10,
        cancel: 4,
        return: 2,
        list: []
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

        case 'INC_CATEGORIES_LIST':
            state = {
                ...state,
                list: action.list
            }
            break;

        case 'INC_PRODUCT_HEAD':
            state = {
                ...state,
                total: action.total,
                on_shelves: action.on_shelves,
                no_longer_be_sold: action.no_longer_be_sold,
                number_of_shelves_available: action.number_of_shelves_available
            }
            break;

        case 'INC_HEAD_ORDER':
            state = {
                ...state,
                total: action.total,
                on_passage: action.on_passage,
                successful_delivery: action.successful_delivery,
                cancel: action.cancel,
                returned_purchase: action.returned_purchase,
            }
            break;

    }
    return state;
}