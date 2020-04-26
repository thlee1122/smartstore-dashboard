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

const product = (state = DEFAULT_PRODUCT, action) => {
	switch(action.type) {
		case PRODUCT.FETCH:
			return { ...state, status: fetchStates.fetching } ;
		case PRODUCT.FETCH_ERROR:
			return { ...state, status: fetchStates.error, message: action.message }
		case PRODUCT.FETCH_SUCCESS:
			// return { ...state, product: action.product }
			return { ...state, status: fetchStates.success, ...action.product }
		default:
			return state;
	}
}

export default product;