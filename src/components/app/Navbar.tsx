import NextLink from "next/link";
import { useRouter } from "next/router";
import {
	AppBar,
	Badge,
	Box,
	Button,
	IconButton,
	Input,
	InputAdornment,
	Link,
	Toolbar,
	Typography,
} from "@mui/material";
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { useContext, useState } from "react";
import { CartContext, UiContext } from "@/context";

export const Navbar = () => {

	const router = useRouter();
	const { toggleSideMenu } = useContext(UiContext);
	const { numberOfItems } = useContext(CartContext);

	const [searchTerm, setSearchTerm] = useState('')
	const [isSearchVisible, setIsSearchVisible] = useState(false);

	const onSearchTerm = () => {
		if (searchTerm.trim().length === 0) return;
		router.push(`/search/${searchTerm}`);
	}

	return (
		<AppBar>
			<Toolbar>
				<NextLink href="/" passHref legacyBehavior>
					<Link display="flex" alignItems="center">
						<Typography variant="h6">Kev |</Typography>
						<Typography
							sx={{
								ml: 0.5,
								mt: 0.5
							}}
						>
							Shop
						</Typography>
					</Link>
				</NextLink>

				<Box flex={1} />

				<Box
					sx={{
						display:
							isSearchVisible ? 'none' :
								{
									xs: 'none',
									sm: 'block'
								}
					}}
					className='fadeIn'
				>
					<NextLink href="/category/men" passHref legacyBehavior>
						<Link>
							<Button
								color={
									router.asPath === '/category/men'
										? 'primary'
										: 'info'
								}
							>Hombres</Button>
						</Link>
					</NextLink>

					<NextLink href="/category/women" passHref legacyBehavior>
						<Link>
							<Button
								color={
									router.asPath === '/category/women'
										? 'primary'
										: 'info'
								}
							>Mujeres</Button>
						</Link>
					</NextLink>

					<NextLink href="/category/kid" passHref legacyBehavior>
						<Link>
							<Button
								color={
									router.asPath === '/category/kid'
										? 'primary'
										: 'info'
								}
							>Niños</Button>
						</Link>
					</NextLink>
				</Box>

				<Box flex={1} />

				{/*  Pantallas Grandes */}
				{
					isSearchVisible
						? (
							<Input
								autoFocus
								type='text'
								className="fadeIn"
								placeholder="Buscar..."
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value)
								}}
								sx={{ 
									display: { xs: 'none', sm: 'flex' },
									width: "35%"
								}}
								onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											onClick={() => {
												setIsSearchVisible(false);
											}}

										>
											<ClearOutlined />
										</IconButton>
									</InputAdornment>
								}
							/>

						)
						:
						(
							<IconButton
								className="fadeIn"
								onClick={() => setIsSearchVisible(true)}
								sx={{ display: { xs: 'none', sm: 'flex' } }}
							>
								<SearchOutlined />
							</IconButton>
						)
				}


				{/* Pantallas pequeñas */}
				<IconButton
					sx={{
						display: {
							xs: 'flex',
							sm: 'none'
						}
					}}
					onClick={toggleSideMenu}
				>
					<SearchOutlined />
				</IconButton>

				<NextLink href="/cart" passHref legacyBehavior>
					<Link>
						<IconButton>
							<Badge badgeContent={
								numberOfItems > 9 ? "+9": numberOfItems								
							} color="secondary">
								<ShoppingCartOutlined />
							</Badge>
						</IconButton>
					</Link>
				</NextLink>

				<Button
					onClick={() => {
						toggleSideMenu();
					}}
				>
					Menú
				</Button>
			</Toolbar>
		</AppBar>
	);
};
