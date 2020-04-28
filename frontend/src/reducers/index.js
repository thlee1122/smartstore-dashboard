import product from './product';
import productList from './productList';
import newProduct from './newProduct';
import { combineReducers } from 'redux';

export default combineReducers({
	product,
	productList,
	newProduct
});