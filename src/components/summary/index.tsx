import { NextPage } from "next";
import NextLink from "next/link";
import Lottie from "lottie-react";
import { ShopLayout } from "@/components/layouts";
import { Box, Link, Typography } from "@mui/material";
import noData from "../../assets/Animation - 1696811846994.json"
export const NoSummary = () => {
  return (
    <ShopLayout
	    title="No Summary"
        pageDescription="No hay datos de envio"
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
					<Typography marginRight={2} typography='h6'>Su poseé datos de facturación</Typography>
					<NextLink href="/" passHref legacyBehavior>
						<Link typography="h5" color="secondary">
							Regresar
						</Link>
					</NextLink>
				</Box>
				<Box display="flex" justifyContent="center" alignItems="center">
					<Lottie
						animationData={noData}
						style={{ height: "300px", width: "300px" }}
					/>
				</Box>
			</Box>
    </ShopLayout>
  )
}
