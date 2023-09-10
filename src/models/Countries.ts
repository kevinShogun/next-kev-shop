import mongoose, { Schema, model, Model } from "mongoose";
import { ICountries } from "@/interfaces";

const countriesSchema = new Schema(
	{
		name: { type: String, require: true },
		code: { type: String, require: true, unique: true },
	},
	{
		timestamps: true,
	}
);

const Country: Model<ICountries> =
	mongoose.models.Country || model("Country", countriesSchema);

export default Country;
