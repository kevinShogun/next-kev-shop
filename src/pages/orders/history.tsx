import { NextPage } from 'next'
import NextLink from 'next/link'
import { ShopLayout } from '@/components/layouts'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

const HistoryPage: NextPage = () => {

    const columns: GridColDef[] = [
        { field: 'id', width: 100, headerName: 'ID' },
        { field: 'fullName', width: 300, headerName: 'Nombre completo' },
        { field: 'paid', width: 200, headerName: 'Pagada', description: 'Muestra si la orden de compra fue pagada o no',
        renderCell: ( params: GridRenderCellParams ) => {
            return (
                params.row.paid
                ? <Chip color='success' label='Pagada' variant='outlined'/>
                : <Chip color='error' label='No pagada' variant='outlined'/>
                )
            },
        },
        {field: 'ordenId',width: 300, headerName: 'Ver orden', description: 'Enlace hacia la orden de compra dentro del sistema',
        sortable: false,
        renderCell: ( params: GridRenderCellParams ) => {
            return (
                params.row.paid
                ?   <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                        <Link color='secondary' underline='always'>{`Orden - #${params.row.id}`}</Link>
                    </NextLink>
                : <Typography color='GrayText' variant='body1'>Esta orden aún no sea pagado</Typography>
                )
            },
        },
    ];

    const rows = [
        { id: 1, paid: true, fullName: 'Kevin Garcia' },
        { id: 10, paid: false, fullName: 'Dennis Arcia' },
        { id: 15, paid: true, fullName: 'Melvin Rosales' },
        { id: 18, paid: false, fullName: 'Ingnacion Calero' },
    ]

    return (
        <ShopLayout
            title='Historial de ordenes'
            pageDescription='Historial de ordenes de compra en la tienda'
        >
            <Typography
                variant='h1'
                component={'h1'}
            >Historial de ordenes de compra</Typography>

            <Grid container>
                <Grid item xs={12} sx={{
                    height: 650, width: "100%"
                }}>
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
        </ShopLayout>
    )
}

export default HistoryPage