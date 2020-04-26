import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Product	from './components/product';
import rootReducer from './reducers';
import './index.css';

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)


render(
	<Provider store={store}>
		<div>
			<h1>Smart Store Dashboard</h1>
			<Product />
		</div>
	</Provider>,
	document.getElementById('root')
);