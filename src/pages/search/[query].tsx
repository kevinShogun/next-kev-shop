import { GetServerSideProps, NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import { dbProducts } from '@/database';
import { IProduct } from "@/interfaces";
import { ShopLayout } from '@/components/layouts';
import { ProductsList } from '@/components/products';

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {


    return (
        <ShopLayout title={'Kev Shop - Buscar'} pageDescription={'Busca las prendas de mayor calidad y precio'}>
            <Typography variant="h1" component="h1">
                Buscar producto{" "}
            </Typography>

            {
                foundProducts
                    ? <Typography variant="h2" sx={{ mb: 5 }} textTransform='capitalize'> {query} </Typography>
                    :
                    <Box display={'flex'}>
                        <Typography variant="h2" sx={{ mb: 5, }}>
                            No encontramos ningun producto
                        </Typography>
                        <Typography variant="h2" sx={{ ml: 2, }} color='secondary' textTransform='capitalize'>
                            {query}                           
                        </Typography>
                    </Box>

            }

            <ProductsList products={products} />
        </ShopLayout>
    );
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { query = '' } = params as { query: string };

    if (query.length === 0) {
        return {
            redirect: {
                destination: "/",
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query);
    
    // TODO: Retornar otros products
    
    const foundProducts = products && products.length > 0;
    
    if(!foundProducts){
        products = await dbProducts.getAllProducts();
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage;