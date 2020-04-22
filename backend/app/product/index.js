const DEFAULT_PROPERTIES = {
	productId: undefined,
	brand: '',
	productName: '',
	price: 0,
	lowSize: 3,
	highSize: 15,
	siteName: '',
	availableSizes: [],
	url: '',
	shippingFee: 0
};

class Product {
	constructor({ 
		productId, brand, productName, 
		price, lowSize, highSize, siteName, 
		availableSizes, url, shippingFee } = {}) {

		this.productId = productId || DEFAULT_PROPERTIES.productId;
		this.brand = brand || DEFAULT_PROPERTIES.brand;
		this.productName = productName || DEFAULT_PROPERTIES.productName;
		this.price = price || DEFAULT_PROPERTIES.price;
		this.lowSize = lowSize || DEFAULT_PROPERTIES.lowSize;
		this.highSize = highSize || DEFAULT_PROPERTIES.highSize;
		this.siteName = siteName || DEFAULT_PROPERTIES.siteName;
		this.availableSizes = availableSizes || DEFAULT_PROPERTIES.availableSizes;
		this.url = url || DEFAULT_PROPERTIES.url;
		this.shippingFee = shippingFee || DEFAULT_PROPERTIES.shippingFee;
	}
}

module.exports = Product;