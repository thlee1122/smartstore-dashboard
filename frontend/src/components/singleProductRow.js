import React, { useState, useEffect }         from 'react';
import { connect } from 'react-redux';
import { deleteProduct } from '../actions/deleteProduct';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const SingleProductRow = (props) => {
  const [updateButtonClick, setUpdateButtonClick] = useState(false);
  
  const { singleProduct, calculatedProductPrice, sellingPrice, storeFee,
    tax, calculatedShipping, newShipping, profit } = props;

  const updatedProduct = {
    brand: '',
    productName: '',
    price: 0,
    lowSize: 0,
    highSize: 0,
    siteName: '',
    availableSizes: [],
    url: '',
    shippingFee: 0,
    updatedDate: ''
  };

  // useEffect(() => {
    
  // }, [])




  // const [brandClick, setBrandClick] = useState(false);


  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleUpdateClick = (e) => {
    console.log('@@@@ got here');

    setUpdateButtonClick(!updateButtonClick);
  }

  // const handleFieldClick = (e, fieldName) => {
  //   console.log("!@%#^$^&#@");

  //   if(fieldName === 'brand') {
  //     setBrandClick(!brandClick);
  //     console.log("~~~ got here", brandClick);
  //   }
  // }

  const handleTextFieldChange = (event, fieldName) => {
    console.log("@#!$% got here");
  }

  // const handleTextFieldChange = (event, textfieldName) => {
  //   if(textfieldName === 'Brand Name') {
  //     setBrand(event.target.value);
  //   } else if(textfieldName === 'Product Name') {
  //     setProductName(event.target.value);
  //   } else if(textfieldName === 'Price') {
  //     setPrice(event.target.value);
  //   } else if(textfieldName === 'Product URL') {
  //     setUrl(event.target.value);
  //   }
  // }

	return (
    <React.Fragment>
  		<TableRow>
        <TableCell align="center" scope="row">
          {singleProduct.id}
        </TableCell>
        <TableCell 
          align="center" 
          scope="row" 
          // onClick={(e) => handleFieldClick(e, 'brand')}
        >
     
          <TextField 
            // id="standard-basic" 
            // label="Brand Name"
            variant="outlined"
            defaultValue={singleProduct.brand}
            onChange={(e) => handleTextFieldChange(e, "brand")}
            inputProps={{ style: {textAlign: 'center'} }}
          />
          
        </TableCell>
        <TableCell align="center" scope="row">
          {singleProduct.productName}
        </TableCell>
        <TableCell align="center" scope="row">
          {`$${singleProduct.price}`}
        </TableCell>
        <TableCell align="center" scope="row">
          {`${numberWithCommas(calculatedProductPrice)} 원`}
        </TableCell>
        <TableCell align="center" scope="row">
          {`${numberWithCommas(sellingPrice)} 원`}
        </TableCell>
        <TableCell align="center" scope="row">
          {`${numberWithCommas(storeFee)} 원`}
        </TableCell>
        <TableCell align="center" scope="row">
          {`${numberWithCommas(tax)} 원`}
        </TableCell>
        <TableCell align="center" scope="row">
          {singleProduct.siteName}
        </TableCell>
        <TableCell align="center" scope="row">
          {singleProduct.availableSizes}
        </TableCell>
        <TableCell align="center" scope="row">
          {singleProduct.url}
        </TableCell>
        <TableCell align="center" scope="row">
          {`$${singleProduct.shippingFee}`}
        </TableCell>
        <TableCell align="center" scope="row">
          {`${numberWithCommas(calculatedShipping)} 원`}
        </TableCell>
        <TableCell align="center" scope="row">
          {`${numberWithCommas(newShipping)} 원`}
        </TableCell>
        <TableCell align="center" scope="row">
          {`${numberWithCommas(profit)} 원`}
        </TableCell>

        <TableCell>
          <Button 
            style={{display: 'inline-block'}}
            variant="contained"
            color="secondary"
            onClick={() => props.deleteProduct(singleProduct.id)}
          >
            DELETE
          </Button>
        </TableCell>

        <TableCell>
          <Button 
            style={{display: 'inline-block'}}
            variant="contained"
            color="primary"
            onClick={(e) => handleUpdateClick()}
            // onClick={() => props.deleteProduct(singleProduct.id)}
          >
            UPDATE
          </Button>
        </TableCell>
      </TableRow>

      {
        updateButtonClick &&
        <TableRow>
          <TableCell align="center" scope="row">
            {singleProduct.id}
          </TableCell>
        </TableRow>
      }
    </React.Fragment>
	);
}

const mapStateToProps = (state, props) => ({
  // productList: state.productList,
  // newProduct: state.newProduct
});

export default connect(mapStateToProps, 
  {
    deleteProduct
  })(SingleProductRow);














