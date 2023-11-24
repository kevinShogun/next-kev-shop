import React from 'react'
import { AdminLayout } from '@/components/layouts'
import { CardMedia, Grid, Link, Box, Button } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import useSWR from 'swr';
import { IProduct } from '@/interfaces';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import NextLink from 'next/link';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
        field: 'img', headerName: 'Foto',
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <a
                    href={`/product/${row.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                    }}>
                    <CardMedia
                        component="img"
                        className="fadeIn"
                        alt={row.title}
                        image={`/products/${row.img}`}
                        sx={{
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </a>
            );

        }
    },
    { field: 'title', headerName: 'Titulo', width: 350,
        renderCell: ({ row }: GridRenderCellParams) => {
            return(
                <NextLink href={`/admin/products/${row.slug}`} passHref legacyBehavior>
                    <Link underline='always'>
                        {row.title}
                    </Link>
                </NextLink>
            )
        },
    },
    { field: 'gender', headerName: 'Genero' },
    { field: 'type', headerName: 'Tipo' },
    { field: 'inStock', headerName: 'Inventario' },
    { field: 'price', headerName: 'Precio' },
    { field: 'size', headerName: 'Tallas', width: 250 },
];


const ProductsAdminPage = () => {

    const { data, error } = useSWR<IProduct[]>("/api/admin/products");

    if (!data && !error) return <></>;

    const rows = data!.map(p => ({
        id: p._id,
        img: p.images[0],
        title: p.title,
        gender: p.gender,
        type: p.type,
        inStock: p.inStock,
        price: p.price,
        size: p.sizes.join(", "),
        slug: p.slug
    }))

    return (
        <AdminLayout
            title={`Productos (${data?.length})`}
            subtitle='Mantenimiento de productos'
            icon={<CategoryOutlined />}
        >
            <Box display={'flex'} justifyContent={'end'} sx={{mb: 2}}>
                <Button
                    startIcon={<AddOutlined/>}
                    color='secondary'
                    href='/admin/products/new'
                >
                    Crear producto
                </Button>
            </Box>
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 5 }
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                    />
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export default ProductsAdminPage