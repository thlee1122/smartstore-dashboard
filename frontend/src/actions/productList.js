import { PRODUCT_LIST } from './types';
import { BACKEND } from '../config';

export const fetchAllProducts = () => dispatch => {
	dispatch({ type: PRODUCT_LIST.FETCH });

	return fetch(`${BACKEND.ADDRESS}/product/all`)
		.then(response => response.json())
		.then(json => {
			if(json.type === 'error') {
				dispatch({
					type: PRODUCT_LIST.FETCH_ERROR,
					message: json.message
				});
			} else {
				dispatch({ 
					type: PRODUCT_LIST.FETCH_SUCCESS,
					allProducts: json.allProducts
				})
			}
		})
		.catch(error => dispatch({
			type: PRODUCT_LIST.FETCH_ERROR,
			message: error.message
		}));
}
