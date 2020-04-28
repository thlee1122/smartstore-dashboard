import React, { useState, useEffect }             from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../actions/product';
import { fetchAllProducts } from '../actions/productList';
import { postNewProduct } from '../actions/newProduct';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import NumberFormat from 'react-number-format';
import SingleAvailableSize from './singleAvailableSize';
import { BACKEND } from '../config';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$ "
      allowNegative={false}
    />
  );
}

const Product = (props) => {
	console.log("@@@@ this.props", props);

	const [values, setValues] = useState({ numberformat: '0' });
  const [lowestSize, setLowestSize] = useState(3.5);
  const [highestSize, setHighestSize] = useState(14);
  const [siteName, setSiteName] = useState('Nike');

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

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const sizes = [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 
  8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14];

  const siteNames = ["Nike", "Adidas", "Goat"];

	const handleLowestSizeChange = (event) => {
		setLowestSize(event.target.value);
	}

	const handleHighestSizeChange = (event) => {
		setHighestSize(event.target.value);

		addingProduct.highSize = event.target.value;
	}

	const handleSiteNameChange = (event) => {
		// addingProduct.siteName = event.target.value;

		setSiteName(event.target.value);

		event.preventDefault();
	}

	addingProduct.siteName = siteName;

	const collectAvailableSizes = (clickedSize) => {
		if(addingProduct.availableSizes.indexOf(clickedSize) === -1) {
			addingProduct.availableSizes.push(clickedSize);

		} else {
			addingProduct.availableSizes.splice(addingProduct.availableSizes.indexOf(clickedSize), 1);
		}

		console.log("***** availableSizes", addingProduct.availableSizes);
	}

	const postProduct = () => {
		console.log("~~~~~ addingProduct", addingProduct);

		if(addingProduct.brand !== '' &&
			addingProduct.productName !== '' &&
			addingProduct.price > 0 &&
			addingProduct.lowSize > 0 &&
			addingProduct.highSize > 0 &&
			addingProduct.siteName !== '' &&
			addingProduct.availableSizes.length !== 0 &&
			addingProduct.url !== '',
			addingProduct.shippingFee > 0
		) {
			console.log("********** got here");

			props.postNewProduct(addingProduct);
		}
	}

	// console.log("~~~~~ addingProduct", addingProduct);

	const handleTextFieldChange = (event, textfieldName) => {
		if(textfieldName === 'Brand Name') {
			// console.log('event.target.value', event.target.value);

			addingProduct.brand = event.target.value;

		} else if(textfieldName === 'Product Name') {
			addingProduct.productName = event.target.value;
		} else if(textfieldName === 'Price') {
			addingProduct.price = event.target.value;
		} else if(textfieldName === 'Product URL') {
			addingProduct.url = event.target.value;
		}
	}

	return (
		<div>
			<h2>Add a product</h2>
			<Button variant="contained" onClick={() => props.fetchProduct()}>New Product</Button>

			<h2>Get Product List</h2>
			<Button variant="contained" onClick={() => props.fetchAllProducts()}>Get Product List</Button>

			<h2>Post New Product</h2>
			<Button variant="contained" onClick={() => postProduct()}>Post New Product</Button>

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
					required 
					id="standard-basic" 
					label="Brand Name" 
					variant="outlined"
					onChange={(e) => handleTextFieldChange(e, "Brand Name")}
				/>
				<TextField 
					required 
					id="standard-basic" 
					label="Product Name" 
					variant="outlined"
					onChange={(e) => handleTextFieldChange(e, "Product Name")}
				/>
    		<TextField 
    			required id="filled-basic" label="Price" variant="outlined"
    			InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }} 
          onChange={(e) => handleTextFieldChange(e, "Price")}
    		/>

    		<TextField 
    			required 
    			id="outlined-basic" 
    			label="Product URL" 
    			variant="outlined" 
    			onChange={(e) => handleTextFieldChange(e, "Product URL")}
    		/>

    		<TextField
	        label="Shipping Fee"
	        required
	        value={values.numberformat}
	        onChange={handleChange}
	        name="numberformat"
	        id="formatted-numberformat-input"
	        variant="outlined"
	        InputProps={{
	          inputComponent: NumberFormatCustom,
	        }}
	      />
			</form>

			<form style={{marginTop: '20px'}}>

				<TextField
          select
          label="Site Name"
          variant="outlined"
          value={siteName}
          onChange={handleSiteNameChange}
          helperText="Please select name of the site"
        >
        	{siteNames.map((siteName) => (
            <MenuItem 
            	key={siteName} 
            	value={siteName}
            >
              {siteName}
            </MenuItem>
          ))}
        </TextField>

				<TextField
          select
          label="Lowest Size"
          variant="outlined"
          value={lowestSize}
          onChange={handleLowestSizeChange}
          helperText="Please select LOWEST size of your product"
          style={{ width: '170px' }}
        >
        	{sizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Highest Size"
          variant="outlined"
          value={highestSize}
          onChange={handleHighestSizeChange}
          helperText="Please select HIGHEST size of your product"
          style={{ width: '170px' }}
        >
        	{sizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </TextField>
			</form>

			<div>
				<p style={{marginBottom: '5px'}}>Available Sizes</p>

				{
					sizes.map((size, index) => {
						return (
							<SingleAvailableSize 
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
  productList: state.productList
});

export default connect(mapStateToProps, 
	{ 
		fetchProduct,
		fetchAllProducts,
		postNewProduct
	})(Product);
