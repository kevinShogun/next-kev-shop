import React, { FC, useMemo, useState } from "react";
import NextLink from "next/link";
import {
	Box,
	Card,
	CardActionArea,
	CardMedia,
	Chip,
	Grid,
	Link,
	Typography,
} from "@mui/material";
import { IProduct } from "@/interfaces";

interface Props {
	product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isImageLoader, setIsImageLoader] = useState(false);

	const productImage = useMemo(() => {
		return isHovered
			? `${product.images[0]}`
			: `${product.images[1]}`;
	}, [isHovered, product.images]);

	return (
		<Grid
			item
			xs={6}
			sm={4}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Card>
				<NextLink href={`/product/${product.slug}`} passHref prefetch={false} legacyBehavior>
					<Link>

						<CardActionArea>
							{
								product.inStock === 0 &&
								<Chip
									color="primary"
									label='No hay disponibles'
									sx={{
										position: 'absolute',
										zIndex: "999",
										top: "10px",
										left: "10px"
									}}
								/>
							}
							<CardMedia
								component="img"
								image={productImage}
								alt={product.title}
								className="fadeIn"
								onLoad={() => setIsImageLoader(true)}
							/>
						</CardActionArea>
					</Link>
				</NextLink>
			</Card>

			<Box className="fadeIn mt-1"
				sx={{
					display: isImageLoader ? 'block' : 'none'
				}}
			>
				<Typography fontWeight={700}>{product.title}</Typography>
				<Typography fontWeight={500}>${product.price}</Typography>
			</Box>
		</Grid>
	);
};
