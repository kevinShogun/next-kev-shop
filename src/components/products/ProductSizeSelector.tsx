import { Box, Button } from "@mui/material";
import { ISize } from "@/interfaces";

interface Props {
	selectedSize?: ISize;
	sizes: ISize[];
	onSelectedSize: (size: ISize) => void;
}

export const ProductSizeSelector = ({ selectedSize, sizes, onSelectedSize }: Props) => {
	return (
		<Box margin="10px 0">
			{sizes.map((size) => (
				<Button
					key={size}
					size="small"
					color={selectedSize === size ? "primary" : "info"}
					onClick={() => onSelectedSize(size)}
				>
					{size}
				</Button>
			))}
		</Box>
	);
};
