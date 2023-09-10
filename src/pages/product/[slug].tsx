import { useContext, useState } from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Alert, Box, Button, Chip, Grid, Snackbar, Stack, Typography } from "@mui/material";
import { dbProducts } from "@/database";
import { ICartProduct, IProduct, ISize } from "@/interfaces";
import { ShopLayout } from "@/components/layouts";
import { ItemCounter } from "@/components/app";
import { ProductSizeSelector, ProductSlideshow } from "@/components/products";
import { useRouter } from "next/router";
import { CartContext } from "@/context";


interface Props {
	product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

	const router = useRouter();

	const {addProductToCart} = useContext(CartContext)

	const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
		_id: product._id,
		images: product.images[1],
		price: product.price,
		size: undefined,
		slug: product.slug,
		title: product.title,
		gender: product.gender,
		quantity: 1,
	});

	const [alertError, setAlertError] = useState({
		show: false,
		msg: ''
	})
	// const router = useRouter();
	// const {products: product, isLoading} = useProducts(`/products/${router.query.slug}`);


    const updateQuantity = (quantity: number) => {
		setTempCartProduct( (currentProduct) => ({
			...currentProduct,
			quantity
		}))
    }

	const onSelectedSize = (size: ISize) => {
		setTempCartProduct({
			...tempCartProduct,
			size
		});
	}

	const onAddProduct = async () => {
		if (!tempCartProduct.size) {
			setAlertError({
				show: true,
				msg: 'Debe seleccionar una talla para agregar el producto al carrito de compras'
			})
			return
		};
		// console.log({ tempCartProduct });

		await addProductToCart(tempCartProduct);

		router.push("/cart");
		
	}

	return (
		<ShopLayout title={product.title} pageDescription={product.description}>
			
			<Snackbar
				open={alertError.show} autoHideDuration={4000} onClose={() => {
					setAlertError({
						...alertError,
						show: false
					})
				}}
				anchorOrigin={{
					horizontal: 'right',
					vertical: 'top'
				}}
			>
				<Alert
					severity="warning"
					onClose={() => {
						setAlertError({
							...alertError,
							show: false
						})
					}}
				>{alertError.msg}</Alert>
			</Snackbar>
			
			<Grid container spacing={3}>
				<Grid item xs={12} sm={7}>
					<ProductSlideshow images={product.images} />
				</Grid>

				<Grid item xs={12} sm={5}>
					<Box display="flex" flexDirection="column">
						{/* Titulos */}
						<Typography variant="h1" component="h1">
							{" "}
							{product.title}{" "}
						</Typography>
						<Typography variant="subtitle1" component="h2">
							${product.price}
						</Typography>
						{/* Cantidad */}
						<Box
							sx={{
								my: 2,
							}}
						>
							<Typography variant="subtitle2">Cantidad</Typography>

							<ItemCounter 
								currentValue={tempCartProduct.quantity}
								updateQuantity={updateQuantity}
								maxValue={product.inStock}

							/>

							<ProductSizeSelector
								selectedSize={tempCartProduct.size}
								sizes={product.sizes}
								onSelectedSize={onSelectedSize}
							/>
						</Box>

						{
							/* Agregar al carrito */
							product.inStock > 0 ?
							<Button color="secondary" className="circular-btn"
								onClick={onAddProduct}
							>
								{
									tempCartProduct.size
									? 'Agregar al carrito'
									: 'Seleccione un talla'
								}
							</Button>
							: <Chip
								label='No hay unidades disponibles'
								color="error"
								variant="outlined"
							/>
						}

						{/* <Chip label="No hay disponibles" color="error" variant="outlined" /> */}

						{/* Descripcion */}
						<Box
							sx={{
								mt: 3,
							}}
						>
							<Typography variant="subtitle2">Descripción</Typography>
							<Typography variant="body2">{product.description}</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {

	const slugs = await dbProducts.getAllProductSlug();

	return {
		paths: slugs.map(({ slug }) => ({ params: { slug } })),
		fallback: 'blocking'
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

	const { slug } = params as { slug: string };

	const product = await dbProducts.getProductBySlug(slug);

	if (!product) {
		return {
			redirect: {
				destination: "/",
				permanent: false
			}
		}
	}

	return {
		props: {
			product
		},
		revalidate: 86400, // 24 hours
	}
}

export default ProductPage;
