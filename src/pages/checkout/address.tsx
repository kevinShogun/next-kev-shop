import { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { tesloApi } from "@/api";
import { CartContext } from "@/context";
import { ICountries } from "@/interfaces";
import { ShopLayout } from "@/components/layouts";

type FormData = {
	firstName: string;
	lastName: string;
	address: string;
	address2?: string;
	zip: string;
	city: string;
	country: string;
	phone: string;
}

const getAdressFormCookies = (): FormData => {

	return {
		firstName: Cookies.get('firstName') || "",
		lastName: Cookies.get('lastName') || "",
		address: Cookies.get('address') || "",
		address2: Cookies.get('address2') || "",
		zip: Cookies.get('zip') || "",
		city: Cookies.get('city') || "",
		country: Cookies.get('country') || "",
		phone: Cookies.get('phone') || "",
	}

}

const AddressPage: NextPage = () => {
	const router = useRouter();

	const [countries, setCountries] = useState<ICountries[]>();
	const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>({
		defaultValues: getAdressFormCookies()
	});

	const { updateAddress } = useContext(CartContext);

	useEffect(() => {
		const getCountries = async () => {
			const { data } = await tesloApi<ICountries[]>("/countries");
			setCountries(data);
		}
		getCountries();
	}, []);



	const onReceiveOrder = (data: FormData) => {
		
		updateAddress(data);

		router.push('/checkout/summary');
	}

	return (
		<ShopLayout
			title={"Dirección"}
			pageDescription={"Confirmar dirección de destino"}
		>
			<Typography variant="h1" component="h1">
				Dirección
			</Typography>
			<br />
			<form
				onSubmit={handleSubmit(onReceiveOrder)}
				noValidate
			>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Nombre"
							variant="filled"
							required
							fullWidth
							{...register('firstName', {
								required: 'Este campo es requerido',
								minLength: {
									value: 2,
									message: 'Mínimo 2 caracteres'
								}
							})}
							error={!!errors.firstName}
							helperText={errors.firstName?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Apellido"
							variant="filled"
							fullWidth
							required
							{...register('lastName', {
								required: 'Este campo es requerido',
								minLength: {
									value: 2,
									message: 'Mínimo 2 caracteres'
								}
							})}
							error={!!errors.lastName}
							helperText={errors.lastName?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField label="Dirección" variant="filled" fullWidth
							required
							{...register('address', {
								required: 'La dirección es obligatoria',
								minLength: {
									value: 5,
									message: 'Mínimo 5 caracteres'
								}
							})}
							error={!!errors.address}
							helperText={errors.address?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField label="Dirección 2" variant="filled" fullWidth
							{...register('address2')}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField label="Código postal" variant="filled" fullWidth
							required
							{...register('zip', {
								required: 'El código postal es obligatoria',
								minLength: {
									value: 5,
									message: 'Mínimo 5 caracteres'
								}
							})}
							error={!!errors.zip}
							helperText={errors.zip?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField label="Ciudad" variant="filled" fullWidth
							required
							{...register('city', {
								required: 'La ciudad es obligatoria',
								minLength: {
									value: 2,
									message: 'Mínimo 2 caracteres'
								}
							})}
							error={!!errors.city}
							helperText={errors.city?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							{
								countries &&
								<TextField
									select
									variant="filled" label='País'
									{...register('country', {
										required: 'El país es obligatorio'
									})}
									defaultValue={countries[0].code}
									error={!!errors.country}

								>
									{
										countries.map(
											(c, index) => (
												<MenuItem key={c._id} value={c.code}> {c.name} </MenuItem>
											)
										)
									}
								</TextField>
							}
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField label="Teléfono" variant="filled" fullWidth
							required
							{...register('phone', {
								required: 'El número de telefono es obligatorio',
								minLength: {
									value: 8,
									message: 'Mínimo 8 caracteres'
								}
							})}
							error={!!errors.phone}
							helperText={errors.phone?.message}
						/>
					</Grid>
				</Grid>
				<Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
					<Button color='secondary' className="circular-btn" size="large"
						type="submit"
					>
						Revisar pedido
					</Button>
				</Box>
			</form>


		</ShopLayout>
	);
};

/*

	------ Version si Nextjs no acepta MIDDLEWARES  -------
export const getServerSideProps: GetServerSideProps = async ({req}) => {

	const { token = '' }  = req.cookies;

	let isValidToken = false;

	try {
		await jwt.isValidToken(token);
		isValidToken = true;
	} catch (error) {
		isValidToken = false;
	}


	if(!isValidToken){
		return {
			redirect: {
				destination: '/auth/login?p=/checkout/address',
				permanent: false
			}
		}
	}
	return {
		props:{

		}
	}
}
*/

export default AddressPage;