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
import { initialData } from "@/database/products";
import { ItemCounter } from "../app";

const productsInCart = [
	initialData.products[0],
	initialData.products[3],
	initialData.products[5],
];

interface Props {
	editable?: boolean;
}

export const CardList = ({ editable = false }: Props) => {
	return (
		<>
			{productsInCart.map((p) => (
				<Grid
					key={p.slug}
					container
					spacing={2}
					sx={{
						mb: 1,
					}}
				>
					<Grid item xs={3}>
						<NextLink href="product/slug" passHref legacyBehavior>
							<Link>
								<CardActionArea>
									<CardMedia
										image={`/products/${p.images[1]}`}
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
								Talla: <strong>M</strong>
							</Typography>
							{/**Codicional */}
							{editable ? (
								<ItemCounter />
							) : (
								<Typography variant="h6">3 Items</Typography>
							)}
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
							<Button variant="text" color="secondary">
								Remover
							</Button>
						)}
					</Grid>
				</Grid>
			))}
		</>
	);
};
