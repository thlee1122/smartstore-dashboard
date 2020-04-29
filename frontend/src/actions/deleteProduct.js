import { PRODUCT_DELETE } from './types';
import { BACKEND } from '../config';

export const deleteProduct = (productId) => dispatch => {
	// console.log('inside postNewProduct', newProduct);

	dispatch({ type: PRODUCT_DELETE.DELETE });

	return fetch(`${BACKEND.ADDRESS}/product/delete/product`, {
		method: 'DELETE',
		// credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ productId })

	}).then(response => response.json())
		.then(json => {
			if(json.type === 'error') {
				dispatch({
					type: PRODUCT_DELETE.DELETE_ERROR,
					message: json.message
				});
			} else {
				dispatch({ 
					type: PRODUCT_DELETE.DELETE_SUCCESS,
					deletedProduct: json.message
				})
			}
		})
		.catch(error => dispatch({
			type: PRODUCT_DELETE.DELETE_ERROR,
			message: error.message
		}));
}


