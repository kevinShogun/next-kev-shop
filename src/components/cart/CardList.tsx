import { useContext } from "react";
import NextLink from "next/link";
import {
	Box,
	Button,
	CardActionArea,
	CardMedia,
	Grid,
	Link,
	Typography,
} from "@mui/material";
import { CartContext } from "@/context";
import { ItemCounter } from "../app";
import { ICartProduct } from "@/interfaces";

interface Props {
	editable?: boolean;
}

export const CardList = ({ editable = false }: Props) => {

	const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);


	const onNewCartQuantity = (p: ICartProduct, newQuantityValue: number) => {
		p.quantity = newQuantityValue;
		updateCartQuantity(p);
	}

	return (
		<>
			{cart && cart.map((p, index) => (
				<Grid
					key={`${p.slug}__${index}`}
					container
					spacing={2}
					sx={{
						mb: 1,
					}}
				>
					<Grid item xs={3}>
						<NextLink href={`product/${p.slug}`} passHref legacyBehavior>
							<Link>
								<CardActionArea>
									<CardMedia
										image={`/products/${p.images}`}
										component="img"
										sx={{
											borderRadius: "10px",
										}}
									/>
								</CardActionArea>
							</Link>
						</NextLink>
					</Grid>
					<Grid item xs={7}>
						<Box display={"flex"} flexDirection="column">
							<Typography variant="body1">{p.title}</Typography>
							<Typography variant="body1">
								Talla: <strong>{p.size}</strong>
							</Typography>
							{/**Codicional */}
							{
								editable ? (
									<ItemCounter
										currentValue={p.quantity}
										maxValue={10}
										updateQuantity={(value) => onNewCartQuantity(p, value)}
									/>
								) : (
									<Typography variant="h6">{p.quantity}
										{
											p.quantity > 1 ? ' productos' : ' producto'
										}
									</Typography>
								)
							}
						</Box>
					</Grid>
					<Grid
						item
						xs={2}
						display="flex"
						alignItems="center"
						flexDirection="column"
					>
						<Typography variant="subtitle1">{`$${p.price}`}</Typography>
						{editable && (
							<Button variant="text" color="secondary"
								onClick={() => removeCartProduct(p)}
							>
								Remover
							</Button>
						)}
					</Grid>
				</Grid>
			))}
		</>
	);
};
