/* eslint-disable prefer-object-spread */
import { Router } from "express";
import { v4 as uuid } from "uuid";
import { ensureAuthenticated } from "./middleware";

const router = Router();

interface ProductDTO {
	name: string;
	description: string;
	price: string;
	id: string;
}

const products: ProductDTO[] = [];

router.get("/products/findByName", (request, response) => {
	const { name } = request.query;
	const product = products.filter((p) => p.name.includes(String(name)));
	return response.status(200).json(product);
});

router.get("/products/:id", (request, response) => {
	const { id } = request.params;
	const findByIdProduct = products.find((product) => product.id === id);
	return response.status(200).json(findByIdProduct);
});

router.post("/products", ensureAuthenticated, (request, response) => {
	const { name, description, price } = request.body;

	const productAlreadyExists = products.find(
		(product) => product.name === name
	);

	if (productAlreadyExists) {
		return response.status(400).json({ message: "Product Already Exists" });
	}

	const product: ProductDTO = {
		description,
		name,
		price,
		id: uuid(),
	};

	products.push(product);

	return response.status(200).json(product);
});

router.put("/products/:id", ensureAuthenticated, (request, response) => {
	const { id } = request.params;
	const { name, description, price } = request.body;

	const productIndex = products.findIndex((product) => product.id === id);

	if (productIndex === -1) {
		return response.status(400).json({ message: "Product doesn't exists!" });
	}

	const product: ProductDTO = Object.assign({
		description,
		name,
		price,
		id,
	});

	products[productIndex] = product;

	return response.status(200).json(product);
});

export { router };
