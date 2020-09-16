import { LOAD_JSON, SET_CURRENT, MODIFY_DATA, LOAD_FAIL, SET_CURRENT_FAIL, MODIFY_DATA_FAIL, SET_LOADING } from './types'
import { products } from "../React-products";

// get products from json
export const loadProduct = () => dispatch => {
    try {
        setLoading();
        dispatch({
            type: LOAD_JSON,
            payload: products
        });
    } catch (error) {
        dispatch({
            type: LOAD_FAIL,
            payload: error.response.statusText
        })
    }
}

export const setCurrent = (product) => dispatch => {
    try {
        setLoading();
        dispatch({
            type: SET_CURRENT,
            payload: product
        });
    } catch (error) {
        dispatch({
            type: SET_CURRENT_FAIL,
            payload: error
        })
    }
}

export const updateProduct = (product, id) => dispatch => {
    try {
        setLoading();
        let productDet = { product: product, id: id }
        dispatch({
            type: MODIFY_DATA,
            payload: productDet
        });
    } catch (error) {
        dispatch({
            type: MODIFY_DATA_FAIL,
            payload: error
        })
    }
}

//set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}