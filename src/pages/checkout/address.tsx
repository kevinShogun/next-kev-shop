import { NextPage } from "next";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ShopLayout } from "@/components/layouts";

const AddressPage: NextPage = () => {
	return (
		<ShopLayout
			title={"Dirección"}
			pageDescription={"Confirmar dirección de destino"}
		>
			<Typography variant="h1" component="h1">
				Dirección
			</Typography>
			<br/>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField label="Nombre" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Apellido" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Dirección" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Dirección 2" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Código postal" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Ciudad" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<Select
							variant="filled"
							label='País'
							value={1}
						>
							<MenuItem value={1}>Nicaragua</MenuItem>
							<MenuItem value={1}>Honduras</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Teléfono" variant="filled" fullWidth />
				</Grid>
			</Grid>

			<Box sx={{mt: 5}} display='flex' justifyContent='center'>
				<Button color='secondary' className="circular-btn" size="large">
					Revisar pedido
				</Button>
			</Box>
			
		</ShopLayout>
	);
};

export default AddressPage;