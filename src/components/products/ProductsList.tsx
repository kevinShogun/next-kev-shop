import { FC } from "react";
import { Grid } from "@mui/material";
import { IProduct } from "@/interfaces";
import { ProductCard } from "./ProductCard";

interface Props {
	products: IProduct[];
}

export const ProductsList: FC<Props> = ({ products }) => {
	return (
		<Grid container spacing={4}>
			{products.map((p) => (
				<ProductCard key={p.slug} product={p} />
			))}
		</Grid>
	);
};
