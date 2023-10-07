import bcrypt from "bcryptjs";
import { database } from "@/database";
import { User } from "@/models";
export const checkUserEmailPass = async (email: string, password: string) => {
	await database.connect();
	const user = await User.findOne({ email });
	await database.disconnect();

	if (!user) {
		return null;
	}
	if (!bcrypt.compareSync(password, user.password!)) {
		return null;
	}

	const { role, name, _id } = user;

	return {
		_id,
		role,
		name,
		email,
	};
};

// esta funcion verifica si el usuario existe en la base de datos
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
	await database.connect();
	const user = await User.findOne({ email: oAuthEmail });

	if (user) {
		await database.disconnect();
		const { _id, name, email, role } = user;
		return { _id, name, email, role };
	}

	const newUser = new User({
		email: oAuthEmail,
		name: oAuthName,
		password: "@",
		role: "client",
	});

    await newUser.save();
	await database.disconnect();
    const { _id, name, email, role } = newUser;
    return { _id, name, email, role };
};
