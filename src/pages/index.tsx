import { Typography } from "@mui/material";
import { useProducts } from "@/hooks";
import { ShopLayout } from "@/components/layouts";
import { ProductsList } from "@/components/products";
import { FullScreenLoading } from "@/components/app";

export default function Home() {


	const { isLoading, products } = useProducts('/products');

	return (
		<ShopLayout
			title="Kev Shop - Home"
			pageDescription="Encuentra los mejores productos aqui"
		>
			<Typography variant="h1" component="h1">
				Tienda{" "}
			</Typography>

			<Typography
				variant="h2"
				sx={{
					mb: 5,
				}}
			>
				Todos los productos
			</Typography>
			{/* <FullScreenLoading /> */}

			{
				isLoading
					? <FullScreenLoading />
					: <ProductsList products={products} />
			}
		</ShopLayout>
	);
}
