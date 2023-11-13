import { database } from "@/database";
import { IUser } from "@/interfaces";
import { User } from "@/models";
import { isValidObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IUser[] | IUser;
export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return getUsers(req, res);
		case "PUT":
			return updateUser(req, res);
		default:
			return res.status(400).json({ message: "Bad request" });
	}
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	await database.connect();

	const users = await User.find().select("-password").lean();

	await database.disconnect();

	return res.status(200).json(users);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	
    const { userId = "", role = "" } = req.body;

	if (!isValidObjectId(userId)) {
		return res
			.status(400)
			.json({ message: "No existe usario por ese ID" + " " + userId });
	}

	const validRoles = ["admin", "client", "super-user", "SEO"];

	if (!validRoles.includes(role)) {
		return res.status(400).json({ message: "Rol no valido" + " " + role });
	}

	await database.connect();

	const user = await User.findById(userId);

	if (!user) {
		await database.disconnect();

		return res
			.status(404)
			.json({ message: "No existe usario"});
	}

    user.role = role;
    await user.save();

	await database.disconnect();

	return res.status(200).json({message: 'Usuario actualizado'});
};
