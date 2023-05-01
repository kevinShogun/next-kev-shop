import Lottie from "lottie-react";
import { ShopLayout } from "@/components/layouts";
import { Box, Typography } from "@mui/material";
import animation404 from "../assets/preview.json";

const Custom404 = () => {
	return (
		<ShopLayout
			title="Page not found"
			pageDescription="No hay nada que mostrar"
		>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height='100vh'
				flexDirection="column"
			>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					component="div"
					sx={{
						flexDirection: {
							xs: "column",
							sm: "row",
						},
					}}
				>
					<Typography
						variant="h1"
						component="h1"
						fontSize={50}
						fontWeight={200}
					>
						404 |
					</Typography>
					<Typography marginLeft={2}>
						No encontramos ninguna pagína aquí
					</Typography>
				</Box>
				<Box display="flex" justifyContent="center" alignItems="center">
					<Lottie
						animationData={animation404}
						style={{ height: "300px", width: "300px" }}
					/>
				</Box>
			</Box>
		</ShopLayout>
	);
};

export default Custom404;
