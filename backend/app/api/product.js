const { Router } = require('express');
const ProductTable = require('../product/table');

const Product = require('../product');

const router = new Router();

router.delete('/delete/product', (req, res, next) => {
	console.log("~~~~~ req.body", req.body);

	const { productId } = req.body;

	ProductTable.deleteProduct(productId)
		.then(() => res.json({ message: 'Successfully deleted the product.' }))
    .catch(error => next(error));
});

// router.put('/update', (req, res, next) => {
//   const { dragonId, nickname, isPublic, saleValue, sireValue } = req.body;

//   DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue })
//     .then(() => res.json({ message: 'successfully updated dragon' }))
//     .catch(error => next(error));
// });



router.post('/newest', (req, res, next) => {
	console.log("~~~~~ req.body", req.body);
	// console.log("11111 req", req);

	const { newProduct } = req.body;

	// const product = new Product({ 
	// 	brand: 'Nike',
	// 	"productName": 'Nike Air Force 1 React',
	// 	price: 120.99,
	// 	lowSize: 3.5,
	// 	highSize: 15,
	// 	siteName: 'nike',
	// 	availableSizes: [3, 4, 5, 6, 7, 8.5, 9],
	// 	url: 'https://www.nike.com/t/air-force-1-react-mens-shoe-gW29tK/CD4366-100',
	// 	shippingFee: 8.5
	// });

	ProductTable.storeProduct(newProduct)
		.then(({ productId }) => {
			console.log('productId', productId);

			console.log("~~~ newProduct", newProduct);

			newProduct.productId = productId;

			// res.json({ product });
			// res.json({ newProduct: newProduct });
			console.log("@@@@", res.json({ newProduct }));
			res.json({ newProduct });

		})
		.catch(error => next(error));
});



router.get('/new', (req, res, next) => {
	const product = new Product({ 
		brand: 'Nike',
		"productName": 'Nike Air Force 1 React',
		price: 120.99,
		lowSize: 3.5,
		highSize: 15,
		siteName: 'nike',
		availableSizes: [3, 4, 5, 6, 7, 8.5, 9],
		url: 'https://www.nike.com/t/air-force-1-react-mens-shoe-gW29tK/CD4366-100',
		shippingFee: 8.5
	});

	ProductTable.storeProduct(product)
		.then(({ productId }) => {
			console.log('productId', productId);

			product.productId = productId;

			res.json({ product });
		})
		.catch(error => next(error));
});

router.get('/all', (req, res, next) => {
	ProductTable.getAllProducts()
		.then(({ allProducts }) => {
			console.log("allProducts", allProducts);

			res.json({ allProducts });
		})
		.catch(error => next(error));

});


module.exports = router;





