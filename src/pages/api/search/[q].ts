import { database } from "@/database";
import { IProduct } from "@/interfaces";
import { Product } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IProduct[];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return searchProducts(req, res);

		default:
			return res.status(400).json({
				message: "Bad Request",
			});
	}
}

async function searchProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
	let { q = "" } = req.query;

	if (q.length === 0) {
		return res.status(400).json({
			message: "Debe de especificar el parametro de busqueda",
		});
	}

	q = q.toString().toLowerCase();

	await database.connect();

	const products = await Product.find({
		$text: { $search: q },
	})
		.select("title images price inStock slug -_id")
		.lean();

	await database.disconnect();

	return res.status(200).json(products);
}
