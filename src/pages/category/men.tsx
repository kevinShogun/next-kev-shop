import { FullScreenLoading } from '@/components/app';
import { ShopLayout } from '@/components/layouts';
import { ProductsList } from '@/components/products';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material';
import { NextPage } from 'next'
import React from 'react'

const MenPage: NextPage = () => {

    const { isLoading, products } = useProducts('/products?gender=men');

    return (
        <ShopLayout
            title="Kev Shop - Hombres"
            pageDescription="Encuentra los mejores productos para hombres aqui"
        >
            <Typography variant="h1" component="h1">
                Hombres{" "}
            </Typography>

            <Typography
                variant="h2"
                sx={{
                    mb: 5,
                }}
            >
                Productos para hombres
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

export default MenPage