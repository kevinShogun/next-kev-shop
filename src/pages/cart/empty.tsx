import { NextPage } from "next";
import NextLink from "next/link";
import Lottie from "lottie-react";
import { ShopLayout } from "@/components/layouts";
import { Box, Link, Typography } from "@mui/material";
import cart from "../../assets/15349-empty-shopping-cart.json";

const EmptyPage: NextPage = () => {
	return (
		<ShopLayout
			title="Shopping Cart Empty"
			pageDescription="No hay articulos en el carrito de compras"
		>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="70vh"
				flexDirection="column"
			>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					component="div"
					sx={{
                       marginTop: 20,
						flexDirection: {
							xs: "column",
							sm: "row",
						},
					}}
				>
					<Typography marginRight={2} typography='h6'>Su carrito está vació</Typography>
					<NextLink href="/" passHref legacyBehavior>
						<Link typography="h5" color="secondary">
							Regresar
						</Link>
					</NextLink>
				</Box>
				<Box display="flex" justifyContent="center" alignItems="center">
					<Lottie
						animationData={cart}
						style={{ height: "300px", width: "300px" }}
					/>
				</Box>
			</Box>
		</ShopLayout>
	);
};

export default EmptyPage;
