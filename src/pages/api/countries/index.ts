import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "@/database";
import { Country } from "@/models";
import { ICountries } from "@/interfaces";

type Data =
	| {
			message: string;
	  }
	| ICountries[];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return getCountries(req, res);
		case "POST":
			return postCountry(req, res);
		default:
			return res.status(400).json({
				message: "Bad Request",
			});
	}
}

const getCountries = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	await database.connect();

	const countries = await Country.find();

	await database.disconnect();

	if (countries) {
		return res.status(200).json(countries);
	} else {
		return res.status(404).json({
			message:
				"No se encontraron registros de países, favor llame al endpoint SEED para llenar con datos de prueba",
		});
	}
};

const postCountry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { name, code } = req.body;

	if (name.trim() === "") {
		return res.status(400).json({
			message: "El nombre del país es requerido",
		});
	}

	if (code.trim() === "") {
		return res.status(400).json({
			message: "El código del país es requerido",
		});
	}

	await database.connect();

	const country = await Country.findOne({ code });
	if(country){
		await database.disconnect();
		return res
			.status(400)
			.json({
				message:
					"Este país ya se encuentra registrado, por favor ingrese uno nuevo",
			});
	}

	const newCountry = new Country({ name, code });

	try {
		await newCountry.save({validateBeforeSave: true});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			message: "Error -  revisar log del servidor",
		});
	}
};
