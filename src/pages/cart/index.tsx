import { NextPage } from "next";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Grid,
	Typography,
} from "@mui/material";
import { CartContext } from "@/context";
import { ShopLayout } from "@/components/layouts";
import { CardList, OrdenSummary } from "@/components/cart";


const CartPage: NextPage = () => {

	const { isLoaded, cart } = useContext(CartContext);
	const router = useRouter();

	useEffect(() => {
		if (isLoaded && cart.length === 0 ) {
			router.replace('/cart/empty');
		}
	}, [isLoaded, cart, router])


	if (!isLoaded)
		return (<></>);

	if (isLoaded && cart.length === 0) {
		router.replace("/cart/empty");
		return null; // Evita el renderizado temporal del componente
	}


	return (
		<ShopLayout
			title={"Carrito - 3"}
			pageDescription={"Carrito de compras en la tienda"}
		>
			<Typography variant="h1" component="h1">
				Carrito
			</Typography>
			<br />
			<Grid container>
				<Grid item xs={12} sm={7}>
					<CardList
						editable={true} products={[]}					/>
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className="summary-card">
						<CardContent>
							<Typography variant="h2">Orden</Typography>
							<Divider sx={{ my: 1 }} />

							<OrdenSummary />

							<Box
								sx={{
									mt: 3,
								}}
							>
								<Button 
									color="secondary" 
									className="circular-btn" 
									fullWidth
									href="/checkout/address"
								>
									Checkout
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default CartPage;
