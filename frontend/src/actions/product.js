import { PRODUCT } from './types';
import { BACKEND } from '../config';

export const fetchProduct = () => dispatch => {
	dispatch({ type: PRODUCT.FETCH });

	return fetch(`${BACKEND.ADDRESS}/product/new`)
		.then(response => response.json())
		.then(json => {
			if(json.type === 'error') {
				dispatch({
					type: PRODUCT.FETCH_ERROR,
					message: json.message
				});
			} else {
				dispatch({ 
					type: PRODUCT.FETCH_SUCCESS,
					product: json.product
				})
			}
		})
		.catch(error => dispatch({
			type: PRODUCT.FETCH_ERROR,
			message: error.message
		}));
}
