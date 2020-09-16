import { LOAD_JSON, SET_CURRENT, MODIFY_DATA, LOAD_FAIL, SET_CURRENT_FAIL, MODIFY_DATA_FAIL, SET_LOADING } from '../actions/types'
import { products } from '../React-products';


const initialState = {
    products: null,
    current: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_JSON:
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
                loading: false
            };
        case MODIFY_DATA:
            return {
                ...state,
                products: [...products, products[action.payload.id] = action.payload.product],
                loading: false
            };
        case LOAD_FAIL:
        case SET_CURRENT_FAIL:
        case MODIFY_DATA_FAIL:
            console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}