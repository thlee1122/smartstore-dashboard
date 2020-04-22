const pool = require('../../databasePool');

class ProductTable {
	static storeProduct(product) {
		const { 
			brand, productName, price, lowSize, highSize, 
			siteName, availableSizes, url, shippingFee } = product;

		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO product(brand, "productName", price, "lowSize", 
				"highSize", "siteName", "availableSizes", url, "shippingFee")
         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
        [brand, productName, price, lowSize, highSize, siteName, availableSizes, url, shippingFee],
        (error, response) => {
        	if(error) return reject(error);

        	const productId = response.rows[0].id;

        	resolve({ productId });
        }
			)
		});
	}
	

	static getAllProducts() {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT * FROM product`,
				[],
				(error, response) => {
					if(error) return reject(error);

					const allProducts = response.rows;

					resolve({ allProducts });
				}
			)
		});
	}
}

module.exports = ProductTable;