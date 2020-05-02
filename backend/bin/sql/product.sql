CREATE TABLE product(
	id 									SERIAL PRIMARY KEY,
	brand 							VARCHAR(64),
	"productName"				VARCHAR(64),
	price								NUMERIC,
	"lowSize"						NUMERIC,
	"highSize"					NUMERIC,
	"siteName"					VARCHAR(64),
	"availableSizes"		NUMERIC [],
	url									TEXT,
	"shippingFee"				NUMERIC,
	"updatedDate"				TIMESTAMP
);