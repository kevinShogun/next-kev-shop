import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { CartContext } from "@/context";
import { currency } from "@/utils";

interface Props {
	orderDefault?: {
		numberOfItems: number;
		subTotal: number;
		taxRate: number;
		total: number;
	}
}

export const OrdenSummary = ({
	orderDefault
}: Props) => {

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
				<Typography>
					{ orderDefault ? 
						`${orderDefault.numberOfItems} ${
							orderDefault.numberOfItems > 1 ? 'Productos' : 'Producto'
						}` :
						`${numberOfItems} , ${numberOfItems > 1 ? 'Productos' : 'Producto'}`
					}
						
				</Typography>
			</Grid>

			<Grid item xs={6}>
				<Typography>Subtotal: </Typography>
			</Grid>

			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{
					orderDefault ? currency.format(orderDefault.subTotal) :
						currency.format(subTotal)
				}
				</Typography>
			</Grid>

			<Grid item xs={6}>
				<Typography>Impuesto ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%): </Typography>
			</Grid>

			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{
					orderDefault ? currency.format(orderDefault.taxRate) :
						currency.format(taxRate)
				}</Typography>
			</Grid>

			<Grid item xs={6} sx={{ mt: 1 }}>
				<Typography variant="subtitle1">Total: </Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 1 }}>
				<Typography variant="subtitle1">{
					orderDefault ? currency.format(orderDefault.total) :
						currency.format(total)
				}</Typography>
			</Grid>
		</Grid>
	);
};
