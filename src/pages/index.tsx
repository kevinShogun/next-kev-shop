import {
	Card,
	CardActionArea,
	CardMedia,
	Grid,
	Typography,
} from "@mui/material";
import { ShopLayout } from "@/components/layouts";
import { initialData } from "@/database/products";
import { ProductsList } from "@/components/products";

export default function Home() {
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
					mb: 1,
				}}
			>
				Todos los productos
			</Typography>

			<ProductsList products={initialData.products as any} />
		</ShopLayout>
	);
}
