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

// postProduct = () => {
// 		console.log("@@@@ got here this.props", this.props);

// 		const product = {
// 			brand: 'Adidas',
// 			productName: 'Adidas Air Force 1 React',
// 			price: 130.99,
// 			lowSize: 5.5,
// 			highSize: 15,
// 			siteName: 'nike',
// 			availableSizes: [3, 4, 5, 6, 7, 8.5, 9],
// 			url: 'https://www.nike.com/t/air-force-1-react-mens-shoe-gW29tK/CD4366-100',
// 			shippingFee: 10.5
// 		};

// 		fetch(`${BACKEND.ADDRESS}/product/newest`, {
// 			method: 'POST',
// 			// credentials: 'include',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({ newProduct: product })

// 		}).then(response => console.log(response.json()))
// 			.then(json => {
// 				alert(json.message);
// 			})
// 			.catch(error => alert(error.message));

// 		// this.props.postNewProduct(product);
// 	}
