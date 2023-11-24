import React from 'react'
import useSWR from 'swr'
import { Grid, Chip } from '@mui/material'
import { GridColDef, DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { IOrder, IUser } from '@/interfaces'
import { AdminLayout } from '@/components/layouts'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Nombre completo', width: 300 },
    { field: 'total', headerName: 'Monto total', width: 250 },
    {
        field: 'isPaid',
        headerName: 'Pagada',
        renderCell: ({ row }: GridRenderCellParams) => {
            return row.isPaid ? <Chip variant='outlined' label='Pagada' color='success' /> : <Chip variant='outlined' label='Pendiente' color='error' />;
        },
        width: 130
    },
    { field: 'noProducts', headerName: 'No. Productos', align: 'center', width: 130 },
    { field: 'createdAt', headerName: 'Fecha de creación', width: 300 },
    {
        field: 'check',
        headerName: 'Ver orden',
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <a href={`/admin/orders/${row.id}`}
                    target='_blank'
                    rel='noreferrer'
                >
                    Ver orden
                </a>
            )
        },
    },
];


const OrdersPage = () => {

    const {data, error} = useSWR<IOrder[]>("/api/admin/orders");

    if(!data && !error) return <></>;

    const rows = data!.map( order => ({
        id: order._id,
        email: (order.user as IUser).email,
        name: (order.user as IUser).name,
        total: Number(order.total).toFixed(2),
        isPaid: order.isPaid,
        noProducts: order.numberOfItems,
        createdAt: order.createdAt
    }))

    return (
        <AdminLayout
            title='Ordenes'
            subtitle='Mantenimiento Ordenes de los clientes'
            icon={<ConfirmationNumberOutlined />}
        >
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

export default OrdersPage