import { FC } from "react";
import { Slide } from "react-slideshow-image";
import styles from "./ProductSlideshow.module.css";

interface Props {
	images: string[];
}
export const ProductSlideshow: FC<Props> = ({ images }) => {
	return (
		<Slide easing="ease" duration={7000} indicators>
			{images.map((img, index) => {
				const url = `/products/${img}`;

				return (
					<div key={index} className={styles["each-slide"]}>
						<div
							style={{
								backgroundImage: `url(${url})`,
								backgroundSize: "cover",
							}}
						></div>
					</div>
				);
			})}
		</Slide>
	);
};
