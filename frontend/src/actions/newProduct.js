import { PRODUCT } from './types';
import { BACKEND } from '../config';

export const postNewProduct = (newProduct) => dispatch => {
	console.log('inside postNewProduct', newProduct);

	dispatch({ type: PRODUCT.FETCH });

	return fetch(`${BACKEND.ADDRESS}/product/newest`, {
		method: 'POST',
		// credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ newProduct })

	}).then(response => response.json())
		.then(json => {
			if(json.type === 'error') {
				dispatch({
					type: PRODUCT.FETCH_ERROR,
					message: json.message
				});
			} else {
				dispatch({ 
					type: PRODUCT.FETCH_SUCCESS,
					newProduct: json.newProduct
				})
			}
		})
		.catch(error => dispatch({
			type: PRODUCT.FETCH_ERROR,
			message: error.message
		}));
}
