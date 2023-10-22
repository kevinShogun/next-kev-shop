import { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import NextLink from "next/link";
import {
	Typography,
	Grid,
	Card,
	CardContent,
	Divider,
	Box,
	Button,
    Link,
	Chip,
} from "@mui/material";
import { CartContext } from "@/context";
import { CardList, OrdenSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import { tesloApi } from "@/api";
import { ICountries } from "@/interfaces";
import { NoSummary } from "@/components/summary";
import { useRouter } from "next/router";

const SummaryPage: NextPage = () => {

	const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);
	const [countryName, setCountryName] = useState('');
	const [isPosting, setIsPosting] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const router = useRouter();

	useEffect(() => {
		if(shippingAddress){
			const getCountryName = async () => {
				const {data} = await tesloApi.get<ICountries>(`/countries?code=${shippingAddress.country}`);
				setCountryName(data.name);
			}
			getCountryName();
		}
	}, [shippingAddress]);
	
	if(!shippingAddress){
		return <NoSummary/>
	}

	const {address, city, firstName, lastName, phone, zip, address2} = shippingAddress;


	const onCreateOrder = async () => {

		setIsPosting(true);

		const { hasError, msg } = await createOrder(); 

		if(hasError){
			setIsPosting(false);
			setErrorMsg(msg);
			return;
		}

		router.replace(`/orders/${msg}`)
	}
	

	return (
		<ShopLayout
			title={"Resumen de orden - 3"}
			pageDescription={"Resumen de la orden de compra"}
		>
			<Typography variant="h1" component="h1">
				Resumen  de orden de compra
			</Typography>
			<br />
			<Grid container>
				<Grid item xs={12} sm={7}>
					<CardList  />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className="summary-card">
						<CardContent>
							<Typography variant="h2">Resumen ({numberOfItems} {numberOfItems === 1 ? 'Producto' : 'Productos'}) </Typography>
							<Divider sx={{ my: 1 }} />
                            
                            <Box display={'flex'} justifyContent='end'>
                                <NextLink href='/checkout/address' passHref legacyBehavior>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>

                            <Typography variant="subtitle1">Dirección de entrega</Typography>
                            <Typography>{firstName} {lastName}</Typography>
                            <Typography>{address}</Typography>
							{
								address2 && 
								<Typography>{address2}</Typography>
							}
                            <Typography>{zip} - {city}</Typography>
                            <Typography>{countryName}</Typography>
                            <Typography>{phone}</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display={'flex'} justifyContent='end'>
                                <NextLink href='/cart' passHref legacyBehavior>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>

							<OrdenSummary />

							<Box sx={{ mt: 3, }}
								display='flex'
								flexDirection='column'
							>
								<Button color="secondary" className="circular-btn" fullWidth
									onClick={onCreateOrder}
									disabled={isPosting}
								>
									Confirmar Orden
								</Button>

								<br/>
								<Chip
									color="error"
									variant="outlined"
									label={errorMsg}
									sx={{
										display: errorMsg ? 'flex' : 'none'
									}}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default SummaryPage;
