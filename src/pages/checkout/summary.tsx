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
} from "@mui/material";
import { CardList, OrdenSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";

const SummaryPage: NextPage = () => {
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
							<Typography variant="h2">Resumen (3 Productos) </Typography>
							<Divider sx={{ my: 1 }} />
                            
                            <Box display={'flex'} justifyContent='end'>
                                <NextLink href='/checkout/address' passHref legacyBehavior>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>

                            <Typography variant="subtitle1">Dirección de entrega</Typography>
                            <Typography>Kevin García</Typography>
                            <Typography>Example direction</Typography>
                            <Typography>336 - JK direction</Typography>
                            <Typography>Nicaragua</Typography>
                            <Typography>+505 8228-0258</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display={'flex'} justifyContent='end'>
                                <NextLink href='/cart' passHref legacyBehavior>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>
							<OrdenSummary />

							<Box
								sx={{
									mt: 3,
								}}
							>
								<Button color="secondary" className="circular-btn" fullWidth>
									Confirmar Orden
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default SummaryPage;
