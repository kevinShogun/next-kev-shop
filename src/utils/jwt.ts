import jwt from "jsonwebtoken";

export const signToken = (_id: string, email: string) => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error(
			"No hay seed de JWT - Favor de revisar las variables de entorno"
		);
	}

	return jwt.sign(
		// Payload
		{ _id, email },
		//Seed
		process.env.JWT_SECRET_SEED,
		//Optionjs
		{ expiresIn: "30d" }
	);
};

export const isValidToken = (token: string): Promise<string> => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error(
			"No hay seed de JWT - Favor de revisar las variables de entorno"
		);
	}

	if (token.length <= 10) {
		return Promise.reject("JWT no es válido, es demasiado corto");
	}

	return new Promise((resolve, reject) => {
		try {
			jwt.verify(token, process.env.JWT_SECRET_SEED || "", (err, payload) => {
				if (err) return reject({ msg: "JWT no es válido", err, payload });

				const { _id } = payload as { _id: string };

				resolve(_id);
			});
		} catch (error) {
			reject({ msg: "JWT no es válido cayo en el catch", error });
		}
	});
};
