import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../actions/product';
import { fetchAllProducts } from '../actions/productList';
import Button from '@material-ui/core/Button';

class Product extends Component {
	render() {	
		return (
			<div>
				<h2>Add a product</h2>
				<Button onClick={() => this.props.fetchProduct()}>New Product</Button>

				<h2>Get Product List</h2>
				<Button onClick={() => this.props.fetchAllProducts()}>Get Product List</Button>

			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
  product: state.product
  // userPermissions: state.userPermissions,
  // profileStatus: state.profileStatus
});

export default connect(mapStateToProps, 
	{ 
		fetchProduct,
		fetchAllProducts
		// getUserProfile, 
		// getProfileStatus, 
		// getUserPermissions
	})(Product);
