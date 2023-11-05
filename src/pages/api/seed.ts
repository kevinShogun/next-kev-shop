// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Country, Order, Product, User } from "@/models";
import { database as db, seedDatabase as seedData } from "@/database";

type Data = {
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (process.env.NODE_ENV === "production") {
		return res.status(401).json({ message: "No tiene acceso a este servicio" });
	}

	await db.connect();

	await User.deleteMany();

	await User.insertMany(seedData.initialData.users);

	await Product.deleteMany();

	await Product.insertMany(seedData.initialData.products);

	await Country.deleteMany();

	await Country.insertMany(seedData.initialData.countries);

	await Order.deleteMany();

	await db.disconnect();

	res.status(200).json({ message: "Proceso realiazdo correctamente" });
}
