import { PRODUCT_LIST } from '../actions/types';
import fetchStates from './fetchStates';

// const DEFAULT_PRODUCT_LIST = { 
// 	productId: '', 
// 	brand: '',
// 	productName: '',
// 	price: 0,
// 	lowSize: 0,
// 	highSize: 0,
// 	siteName: '',
// 	availableSizes: [],
// 	url: '',
// 	shippingFee: 0 
// };

const productList = (state = [], action) => {
	switch(action.type) {
		case PRODUCT_LIST.FETCH:
			return { ...state, status: fetchStates.fetching } ;
		case PRODUCT_LIST.FETCH_ERROR:
			return { ...state, status: fetchStates.error, message: action.message }
		case PRODUCT_LIST.FETCH_SUCCESS:
			// return { ...state, allProducts: action.allProducts }
			return { ...state, status: fetchStates.success, ...action.allProducts }
		default:
			return state;
	}
}

export default productList;