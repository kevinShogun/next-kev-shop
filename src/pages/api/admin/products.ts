import { NextApiRequest, NextApiResponse } from "next";
import { database } from "@/database";
import { IProduct } from "@/interfaces";
import { Product } from "@/models";
import { isValidObjectId } from "mongoose";

type Data = 
	| { message: string } 
	| IProduct
	| IProduct[];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return getProducts(req, res);
		case "POST":
			return postProduct(req, res);
		case "PUT":
			return updateProduct(req, res);
		default:
			return res.status(400).json({ message: "Bad Request" });
	}
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	await database.connect();

	const products = await Product.find().sort({ title: "desc" }).lean();

	await database.disconnect();
	// todo: actualizar imagenes

	return res.status(200).json(products);
};

const updateProduct = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { _id = "", images = [] } = req.body;
	if (!isValidObjectId(_id)) {
		return res.status(400).json({ message: "No es un id válido 😱" });
	}

	if (images.length < 2) {
		return res.status(400).json({
			message: "El producto obligatoriamente debe tener 2 imagenes o más 😱",
		});
	}

	try {
		await database.connect();

		const product = await Product.findById(_id)
		if(!product){
			return res.status(404).json({ message: "Producto no encontrado 🤯" });
		}

		// Todo: de eliminar fotos en cloudinary
		await product.updateOne(req.body);

		await database.disconnect();

		return res.status(200).json(product);


	} catch (error) {
		await database.disconnect();
		console.log(error);
		return res.status(400).json({ message: "Revisar logs del servidor" });

	}
};

const postProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

	const { images = [] } = req.body as IProduct;
	
	if (images.length < 2) {
		return res.status(400).json({
			message: "El producto obligatoriamente debe tener 2 imágenes o más 😱",
		});
	}

	try {
		await database.connect();

		const productInDB = await Product.findOne({slug: req.body.slug});
		if(productInDB){
			await database.disconnect();
			return res.status(400).json({ message: "Ya existe un producto con ese Slug 🥲" });
		}

		const product = new Product(req.body);
		await product.save();
		await database.disconnect();

		return res.status(201).json(product);

	} catch (error) {
		await database.disconnect();
		console.log(error);
		return res.status(400).json({ message: "Revisar logs del servidor" });

	}


}