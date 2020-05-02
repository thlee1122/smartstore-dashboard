import React, { useState, useEffect }         from 'react';
import { connect } from 'react-redux';
import { fetchAllProducts } from '../actions/productList';
import { deleteProduct } from '../actions/deleteProduct';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import SingleProductRow from './SingleProductRow';

const useStyles = makeStyles({
  table: {
    minWidth: 2000,
  },
});

const ProductList = (props) => {
  const classes = useStyles();
  const [newProduct, setNewProduct] = useState({});

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    props.fetchAllProducts();
  }, [])

  useEffect(() => {
    setNewProduct(props.newProduct);
  }, [props.newProduct])

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

	return (
    <div className="product-list">
  		<h1 style={{marginTop: '64px'}}>Product List</h1>
     
      <TableContainer component={Paper}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" align="center" width="68px">Product ID</TableCell>
              <TableCell component="th" align="center">Brand</TableCell>
              <TableCell component="th" align="center">Product Name</TableCell>
              <TableCell component="th" align="center">Product Price ($)</TableCell>
              <TableCell component="th" align="center">Product Price (&#8361;)</TableCell>
              <TableCell component="th" align="center">Selling Price (&#8361;)</TableCell>
              <TableCell component="th" align="center">Store Fee (&#8361;)</TableCell>
              <TableCell component="th" align="center">Tax (&#8361;)</TableCell>
              <TableCell component="th" align="center">Site Name</TableCell>
              <TableCell component="th" align="center">Available Sizes</TableCell>
              <TableCell component="th" align="center">Product URL</TableCell>
              <TableCell component="th" align="center">Shipping Fee</TableCell>
              <TableCell component="th" align="center">Shipping Fee (&#8361;)</TableCell>
              <TableCell component="th" align="center">New Shipping Fee (&#8361;)</TableCell>
              <TableCell component="th" align="center">Profit (&#8361;)</TableCell>
              <TableCell component="th" align="center"></TableCell>
              <TableCell component="th" align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              newProduct.brand !== '' &&
                <TableRow>
                  <TableCell align="center" scope="row">
                    {newProduct.id}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {newProduct.brand}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {newProduct.productName}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {`$${newProduct.price}`}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {newProduct.lowSize}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {newProduct.highSize}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {newProduct.siteName}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {newProduct.availableSizes}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {newProduct.url}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {`$${newProduct.shippingFee}`}
                  </TableCell>
                </TableRow>
            }

            {
              Object.keys(props.productList).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((index) => {
              // Object.keys(props.productList).map((index) => {
                const singleProduct = props.productList[index];
                const calculatedProductPrice = singleProduct.price * 1250;
                const sellingPrice = calculatedProductPrice * 1.2;
                const storeFee = sellingPrice * 0.057;
                const tax = sellingPrice * 0.1;
                const calculatedShipping = singleProduct.shippingFee * 1250;
                const newShipping = 29900;
                const profit = sellingPrice - calculatedProductPrice - storeFee - tax + (newShipping - calculatedShipping);

                return (
                  <SingleProductRow 
                    key={index}
                    singleProduct={singleProduct}
                    calculatedProductPrice={calculatedProductPrice}
                    sellingPrice={sellingPrice}
                    storeFee={storeFee}
                    tax={tax}
                    calculatedShipping={calculatedShipping}
                    newShipping={newShipping}
                    profit={profit}
                  />
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={Object.keys(props.productList).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
	);
}

const mapStateToProps = (state, props) => ({
  productList: state.productList,
  newProduct: state.newProduct
});

export default connect(mapStateToProps, 
  {
    fetchAllProducts,
    deleteProduct
  })(ProductList);