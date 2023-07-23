import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { CartContext } from "@/context";
import { currency } from "@/utils";

export const OrdenSummary = () => {

	const {
		numberOfItems,
		subTotal,
		taxRate,
		total
	} = useContext(CartContext)

	

	return (
		<Grid
			container
			spacing={1}
			sx={{
				mb: 1,
			}}
		>
			<Grid item xs={6}>
				<Typography>No. Productos</Typography>
			</Grid>

			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{numberOfItems}</Typography>
			</Grid>

			<Grid item xs={6}>
				<Typography>Subtotal: </Typography>
			</Grid>

			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{currency.format(subTotal)}</Typography>
			</Grid>

            <Grid item xs={6}>
				<Typography>Impuesto ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%): </Typography>
			</Grid>

			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{currency.format(taxRate)}</Typography>
			</Grid>

            <Grid item xs={6} sx={{mt: 1}}>
				<Typography variant="subtitle1">Total: </Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end" sx={{mt: 1}}>
				<Typography variant="subtitle1">{currency.format(total)}</Typography>
			</Grid>
		</Grid>
	);
};
