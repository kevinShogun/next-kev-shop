import { Grid, Typography } from "@mui/material";

export const OrdenSummary = () => {
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
				<Typography>3</Typography>
			</Grid>

			<Grid item xs={6}>
				<Typography>Subtotal: </Typography>
			</Grid>

			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{`$${153.6}`}</Typography>
			</Grid>

            <Grid item xs={6}>
				<Typography>Impuesto (15%): </Typography>
			</Grid>

			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{`$${13.1}`}</Typography>
			</Grid>

            <Grid item xs={6} sx={{mt: 1}}>
				<Typography variant="subtitle1">Total: </Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end" sx={{mt: 1}}>
				<Typography variant="subtitle1">{`$${13.1 + 153.6}`}</Typography>
			</Grid>
		</Grid>
	);
};
