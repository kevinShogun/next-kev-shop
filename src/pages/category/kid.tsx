import { NextPage } from 'next'
import { Typography } from '@mui/material'
import { useProducts } from '@/hooks'
import { ShopLayout } from '@/components/layouts'
import { FullScreenLoading } from '@/components/app'
import { ProductsList } from '@/components/products'

const KidPage: NextPage = () => {

    const { isLoading, products } = useProducts('/products?gender=kid');

    return (
        <ShopLayout
            title="Kev Shop - Niños"
            pageDescription="Encuentra los mejores productos para niños aqui"
        >
            <Typography variant="h1" component="h1">
            Niños{" "}
            </Typography>

            <Typography
                variant="h2"
                sx={{
                    mb: 5,
                }}
            >
            Productos para niños

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

export default KidPage