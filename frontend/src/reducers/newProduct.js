import { PRODUCT } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_PRODUCT = { 
	productId: '', 
	brand: '',
	productName: '',
	price: 0,
	lowSize: 0,
	highSize: 0,
	siteName: '',
	availableSizes: [],
	url: '',
	shippingFee: 0 
};

const newProduct = (state = DEFAULT_PRODUCT, action) => {
	switch(action.type) {
		case PRODUCT.FETCH:
			return { ...state, status: fetchStates.fetching } ;
		case PRODUCT.FETCH_ERROR:
			return { ...state, status: fetchStates.error, message: action.message }
		case PRODUCT.FETCH_SUCCESS:
			console.log("2222 got here");
			// return { ...state, newProduct: action.newProduct }
			return { ...state, status: fetchStates.success, ...action.newProduct }
		default:
			return state;
	}
}

export default newProduct;