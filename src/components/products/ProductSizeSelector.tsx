import { Box, Button } from "@mui/material";
import { ISize } from "@/interfaces";

interface Props {
	selectedSize?: ISize;
	sizes: ISize[];
}

export const ProductSizeSelector = ({ selectedSize, sizes }: Props) => {
	return (
		<Box margin="10px 0">
			{sizes.map((size) => (
				<Button
					key={size}
					size="small"
					color={selectedSize === size ? "primary" : "info"}
				>
					{size}
				</Button>
			))}
		</Box>
	);
};
