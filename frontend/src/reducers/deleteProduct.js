import { PRODUCT_DELETE } from '../actions/types';
import fetchStates from './fetchStates';

const deleteProduct = (state = {}, action) => {
	switch(action.type) {
		case PRODUCT_DELETE.DELETE:
			return { ...state, status: fetchStates.fetching } ;
		case PRODUCT_DELETE.DELETE_ERROR:
			return { ...state, status: fetchStates.error, message: action.message }
		case PRODUCT_DELETE.DELETE_SUCCESS:
			console.log("2222 got here");
			// return { ...state, newProduct: action.newProduct }
			return { ...state, status: fetchStates.success, ...action.message }
		default:
			return state;
	}
}

export default deleteProduct;