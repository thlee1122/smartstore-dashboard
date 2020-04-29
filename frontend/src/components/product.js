import React, { useState, useEffect }             from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../actions/product';
import { fetchAllProducts } from '../actions/productList';
import { postNewProduct } from '../actions/newProduct';
import { deleteProduct } from '../actions/deleteProduct';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import NumberFormat from 'react-number-format';
import SingleAvailableSize from './singleAvailableSize';
import { BACKEND } from '../config';
import SiteName from './siteName';
import LowestSize from './lowestSize';
import HighestSize from './highestSize';
import ShippingFee from './shippingFee';

const Product = (props) => {
  const addingProduct = {
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

  const availableSizes = [];

  const sizes = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 
  8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 15];

  const [siteName, setSiteName] = useState('Nike');
  const [lowestSize, setLowestSize] = useState(3);
  const [highestSize, setHighestSize] = useState(15);

  const [shippingFee, setShippingFee] = useState(6.5);
  const [shippingFeeError, setShippingFeeError] = useState(false);
  const [shippingFeeHelperText, setShippingFeeHelperText] = useState('');

  const [brand, setBrand] = useState('');
  const [brandError, setBrandError] = useState(false);
  const [brandHelperText, setBrandHelperText] = useState('');


  const [productName, setProductName] = useState('');
  const [productNameError, setProductNameError] = useState(false);
  const [productNameHelperText, setProductNameHelperText] = useState('');

  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState(false);
  const [priceHelperText, setPriceHelperText] = useState('');

  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState(false);
  const [urlHelperText, setUrlHelperText] = useState('');

  const setProductInfo = (componentName, selectedItem) => {
  	if(componentName === 'Site Name') {
  		setSiteName(selectedItem);
  	} else if(componentName === 'Lowest Size') {
  		setLowestSize(selectedItem);
  	} else if(componentName === 'Highest Size') {
  		setHighestSize(selectedItem);
  	} else if(componentName === 'Shipping Fee') {
  		setShippingFee(selectedItem);
  	}
  }

	const collectAvailableSizes = (clickedSize) => {
		if(addingProduct.availableSizes.indexOf(clickedSize) === -1) {
			addingProduct.availableSizes.push(clickedSize);
		} else {
			addingProduct.availableSizes.splice(addingProduct.availableSizes.indexOf(clickedSize), 1);
		}
	}

	// console.log("@@@@ shippingFee", shippingFee);

	const postProduct = () => {
		if(brand === '') {
			setBrandError(true);
			setBrandHelperText('Please input brand name');
		} else if(brand !== '') {
			setBrandError(false);
			setBrandHelperText('');
		}

		if(productName === '') {
			setProductNameError(true);
			setProductNameHelperText('Please input product name');
		} else if(productName !== '') {
			setProductNameError(false);
			setProductNameHelperText('');
		}

		if(price === 0 || price === '') {
			setPriceError(true);
			setPriceHelperText('Please input price of the product');
		} else if(price !== 0 && price !== '') {
			setPriceError(false);
			setPriceHelperText('');
		}

		if(url === '') {
			setUrlError(true);
			setUrlHelperText('Please input url of the product page');
		} else if(url !== '') {
			setUrlError(false);
			setUrlHelperText('');
		}

		if(shippingFee === '' || shippingFee < 1) {
			setShippingFeeError(true);
			setShippingFeeHelperText('Please input valid shipping fee. Must be greater than $1.');
		} else {
			setShippingFeeError(false);
			setShippingFeeHelperText('');
		}


		if(brand !== '' && productName !== '' &&
			price > 0 && lowestSize > 0 &&
			highestSize > 0 && siteName !== '' &&
			addingProduct.availableSizes.length > 0 &&
			url !== '' && shippingFee > 0
		) {

			addingProduct.brand = brand;
			addingProduct.productName = productName;
			addingProduct.price = price;
			addingProduct.lowSize = lowestSize;
			addingProduct.highSize = highestSize;
			addingProduct.siteName = siteName;
			addingProduct.url = url;
			addingProduct.shippingFee = shippingFee;

			console.log("********** got here addingProduct", addingProduct);

			props.postNewProduct(addingProduct);
		}
	}

	const handleTextFieldChange = (event, textfieldName) => {
		if(textfieldName === 'Brand Name') {
			setBrand(event.target.value);
		} else if(textfieldName === 'Product Name') {
			setProductName(event.target.value);
		} else if(textfieldName === 'Price') {
			setPrice(event.target.value);
		} else if(textfieldName === 'Product URL') {
			setUrl(event.target.value);
		}
	}

	console.log("@@@@ props", props);

	return (
		<div>
			<h2>Add a product</h2>
			<Button variant="contained" onClick={() => props.fetchProduct()}>New Product</Button>

			<h2>Get Product List</h2>
			<Button variant="contained" onClick={() => props.fetchAllProducts()}>Get Product List</Button>

			<h2>Post New Product</h2>
			<Button variant="contained" onClick={() => postProduct()}>Post New Product</Button>



			<h2>Delete Product</h2>
			<Button variant="contained" onClick={() => props.deleteProduct(32)} >Delete a product</Button>



			{
				Object.keys(props.productList).map((index) => {
					const singleProduct = props.productList[index];

					return (
						<div key={index}><p>{singleProduct.brand}</p></div>
					);
				})
			}

			<form noValidate autoComplete="off" style={{marginTop: '30px'}}>
				<TextField 
					error={brandError}
					helperText={brandHelperText}
					required 
					id="standard-basic" 
					label="Brand Name" 
					variant="outlined"
					onChange={(e) => handleTextFieldChange(e, "Brand Name")}
				/>
				<TextField 
					error={productNameError}
					helperText={productNameHelperText}
					required 
					id="standard-basic" 
					label="Product Name" 
					variant="outlined"
					onChange={(e) => handleTextFieldChange(e, "Product Name")}
				/>
    		<TextField 
					error={priceError}
					helperText={priceHelperText}
    			required 
    			id="filled-basic" 
    			label="Price" 
    			variant="outlined"
    			InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }} 
          onChange={(e) => handleTextFieldChange(e, "Price")}
    		/>

    		<TextField 
    			required 
    			error={urlError}
					helperText={urlHelperText}
    			id="outlined-basic" 
    			label="Product URL" 
    			variant="outlined" 
    			onChange={(e) => handleTextFieldChange(e, "Product URL")}
    		/>

    		<ShippingFee 
    			setProductInfo={setProductInfo} 
    			shippingFeeError={shippingFeeError}
    			shippingFeeHelperText={shippingFeeHelperText}
    		/>
			</form>

			<form style={{marginTop: '20px'}}>
				<SiteName setProductInfo={setProductInfo} />
				<LowestSize sizes={sizes} setProductInfo={setProductInfo} />
        <HighestSize sizes={sizes} setProductInfo={setProductInfo} />
			</form>

			<div>
				<p style={{marginBottom: '5px'}}>Available Sizes</p>

				{
					sizes.map((size, index) => {
						let disabled = false;

						if(size < lowestSize) disabled = true;
						else if(size > highestSize) disabled = true;
						else disabled = false;

						return (
							<SingleAvailableSize 
								disabled={disabled}
								key={index} size={size}
								collectAvailableSizes={collectAvailableSizes}
							/>
						);
					})
				}
			</div>
		</div>
	);
}

const mapStateToProps = (state, props) => ({
  product: state.product,
  newProduct: state.newProduct,
  productList: state.productList,
  deletedProduct: state.deletedProduct
});

export default connect(mapStateToProps, 
	{ 
		fetchProduct,
		fetchAllProducts,
		postNewProduct,
		deleteProduct
	})(Product);
