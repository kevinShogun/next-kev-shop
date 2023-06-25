import { database } from "@/database";
import { Product } from "@/models";
import { IProduct } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IProduct;
export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	// const { slug } = req.query;

	switch (req.method) {
		// case "PUT":
		// return updateProduct(req, res);
		case "GET":
			return getOneProduct(req, res);
		// case "DELETE":
		// return deleteProduct(req, res);
		default:
			return res.status(400).json({ message: "Endpoint no existe" });
	}
}

const getOneProduct = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { slug } = req.query;

	await database.connect();
	const thisProduct = await Product.findOne({ slug }).lean();
	await database.disconnect();

	if (!thisProduct) {
		return res.status(400).json({
			message: `Ocurrio un error al momento de mandar a traer el objeto con slug: ${slug}`,
		});
	}

	return res.json(thisProduct);
};
