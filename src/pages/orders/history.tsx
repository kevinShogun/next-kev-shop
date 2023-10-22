import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import NextLink from 'next/link'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { dbOrders } from '@/database'
import { IOrder } from '@/interfaces'
import { ShopLayout } from '@/components/layouts'


interface Props {
    orders: IOrder[];
}

const columns: GridColDef[] = [
    { field: 'id', width: 100, headerName: 'ID' },
    { field: 'fullName', width: 300, headerName: 'Nombre completo' },
    {
        field: 'paid', width: 200, headerName: 'Pagada', description: 'Muestra si la orden de compra fue pagada o no',
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='Pagada' variant='outlined' />
                    : <Chip color='error' label='No pagada' variant='outlined' />
            )
        },
    },
    {
        field: 'ordenId', width: 300, headerName: 'Ver orden', description: 'Enlace hacia la orden de compra dentro del sistema',
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                // params.row.paid ?
                     <NextLink href={`/orders/${params.row.orderId}`} passHref legacyBehavior>
                        <Link color='secondary' underline='always'>{`Orden - # ${params.row.orderId.slice(0, 7)}`}</Link>
                    </NextLink>
                // : <Typography color='GrayText' variant='body1'>Esta orden aún no sea pagado</Typography>
            )
        },
    },
];

// const rows = [
//     { id: 1, paid: true, fullName: 'Kevin Garcia' },
//     { id: 10, paid: false, fullName: 'Dennis Arcia' },
//     { id: 15, paid: true, fullName: 'Melvin Rosales' },
//     { id: 18, paid: false, fullName: 'Ingnacion Calero' },
// ]

const HistoryPage: NextPage<Props> = ({orders}) => {

    const rows = orders.map((o, index) => (
        { 
            id: index + 1, 
            paid: o.isPaid, 
            fullName: `${o.shippingAddress.firstName} ${o.shippingAddress.lastName}`,
            orderId: o._id
        }
    ))

    return (
        <ShopLayout
            title='Historial de ordenes'
            pageDescription='Historial de ordenes de compra en la tienda'
        >
            <Typography
                variant='h1'
                component={'h1'}
            >Historial de ordenes de compra</Typography>

            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{height: 650, width: "100%" }}>
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

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {

    const session: any = await getSession({req});

    if(!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser(session.user._id);

    return {
        props:{
            orders
        }
    }
}

export default HistoryPage