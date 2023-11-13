import { database } from "@/database";
import { Order, Product, User } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
	numberOfOrders: number;
	paidOrders: number; // isPaid true
	notPaidOrders: number;
	numberOfClients: number; // role only client
	numberOfProducts: number;
	productsWithNoInventory: number; // 0
	lowInventory: number; // productos whit 10 or less
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	await database.connect();

	// const getNumberOfOrders = await Order.count();
	// const getPaidOrders = await Order.find({isPaid: true}).count();
	// const getClients = await User.find({ role: 'client'}).count();
	// const getProducts = await Product.count();
	// const getProductsOffStock = await Product.find({ inStock: 0 }).count();
	// const getProductsLow = await Product.find({inStock: {$lte: 10}}).count();

	const [
		numberOfOrders,
        paidOrders,
		numberOfClients,
		numberOfProducts,
		productsWithNoInventory,
		lowInventory,
	] = await Promise.all([
		Order.count(),
		Order.find({ isPaid: true }).count(),
		User.find({ role: "client" }).count(),
		Product.count(),
		Product.find({ inStock: 0 }).count(),
		Product.find({ inStock: { $lte: 10 } }).count(),
	]);

	await database.disconnect();

	res.status(200).json({
		numberOfOrders,
		paidOrders,
		numberOfClients,
		numberOfProducts,
		productsWithNoInventory,
        lowInventory,
		notPaidOrders: numberOfOrders - paidOrders,
	});
}
