import { database } from "@/database";
import { IPaypal } from "@/interfaces";
import { Order } from "@/models";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
	messega: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "POST":
			return payOrder(req, res);
		default:
			return res.status(200).json({ messega: "ok" });
	}
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

	// todo validar sesion del usuarios
	// todo validar mongo id

	const paypalBearerToken = await getPaypalBearerToken();

	if (!paypalBearerToken) {
		return res
			.status(400)
			.json({ messega: "No se pudo confirmar la orden de pago 🥲" });
	}

	const { transactionId, orderId } = req.body;

	const { data } = await axios.get<IPaypal.PaypalStatusResponse>(
		`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
		{
			headers: {
				Authorization: `Bearer ${paypalBearerToken}`,
			},
		}
	);
	

	if(data.status !== 'COMPLETED'){
		return res
			.status(401)
			.json({ messega: "Orden no reconocida 🤯" });
	}

	await database.connect();

	const dbOrder = await Order.findById(orderId);

	if(!dbOrder){
		await database.disconnect();
		return res
			.status(400)
			.json({ messega: "Orden no existe en nuestra base de datos 😱" });
	}


	if(dbOrder.total !== Number(data.purchase_units[0].amount.value)){
		await database.disconnect();
		return res
			.status(400)
			.json({ messega: "Los montos de PayPal y nuestra orden no son iguales 🥶" });
	}

	dbOrder.transactionId = transactionId;
	dbOrder.isPaid = true;
	dbOrder.save();

	await database.disconnect();
	
	return res.status(200).json({ messega: `Orden Pagada con exito 😎` });
};

const getPaypalBearerToken = async (): Promise<string | null> => {
	const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT;
	const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

	const body = new URLSearchParams("grant_type=client_credentials");
	const base64Token = Buffer.from(
		`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
		"utf-8"
	).toString("base64");

	try {
		const { data } = await axios.post(
			process.env.PAYPAL_OAUTH_URL || "",
			body,
			{
				headers: {
					Authorization: `Basic ${base64Token}`,
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);

		return data.access_token;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error.response?.data);
		} else {
			console.log(error);
		}
		return null;
	}
};
