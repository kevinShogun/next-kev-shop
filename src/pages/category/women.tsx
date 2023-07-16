import { NextPage } from 'next'
import { Typography } from '@mui/material'
import { useProducts } from '@/hooks'
import { ShopLayout } from '@/components/layouts'
import { FullScreenLoading } from '@/components/app'
import { ProductsList } from '@/components/products'

const WomenPage: NextPage = () => {
    const { isLoading, products } = useProducts('/products?gender=women');

    return (
        <ShopLayout
            title="Kev Shop - Mujeres"
            pageDescription="Encuentra los mejores productos para mujeres aqui"
        >
            <Typography variant="h1" component="h1">
                Mujeres
                {" "}
            </Typography>

            <Typography
                variant="h2"
                sx={{
                    mb: 5,
                }}
            >
                Productos para mujeres

            </Typography>
            {/* <FullScreenLoading /> */}

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductsList products={products} />
            }
        </ShopLayout>
    )
}

export default WomenPage