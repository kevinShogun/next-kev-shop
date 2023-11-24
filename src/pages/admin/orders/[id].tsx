import React from 'react'
import { CardList, OrdenSummary } from '@/components/cart';
import { AdminLayout } from '@/components/layouts';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';
import { ConfirmationNumberOutlined, CreditCardOffOutlined, CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next'


interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

    if (!order) return <></>

    const { shippingAddress } = order;

    return (
        <AdminLayout
            title='Resumen de la orden'
            subtitle={`No. ${order._id}`}
            icon={<ConfirmationNumberOutlined />}
        >
            {
                order.isPaid ?
                    <Chip
                        sx={{ my: 2, p: 1 }}
                        label='Pagada' variant='outlined' color='success'
                        icon={<CreditScoreOutlined />}
                    />
                    :
                    <Chip
                        sx={{ my: 2, p: 1 }}
                        label='Pendiente de pago' variant='outlined' color='error'
                        icon={<CreditCardOffOutlined />}
                    />
            }
            <br />
            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    <CardList
                        products={order.orderItems}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Resumen ( {order.numberOfItems} {
                                order.numberOfItems > 1 ? 'Productos' : 'Producto'
                            })</Typography>

                            <Divider sx={{ my: 1 }} />
                            <Typography variant="subtitle1">Dirección de entrega</Typography>
                            <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                            <Typography>{shippingAddress.address}
                                {
                                    shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''
                                }
                            </Typography>
                            <Typography>{shippingAddress.city}, {shippingAddress.zip}</Typography>
                            <Typography>{shippingAddress.country}</Typography>
                            <Typography>{shippingAddress.phone}</Typography>
                            <Divider sx={{ my: 1 }} />

                            <OrdenSummary
                                orderDefault={{
                                    numberOfItems: order.numberOfItems,
                                    subTotal: order.subTotal,
                                    taxRate: order.taxRate,
                                    total: order.total
                                }}
                            />
                            <Box
                                sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}
                            >
                                {order.isPaid ? <Chip
                                    sx={{ my: 2, p: 1 }}
                                    label='Orden pagada'
                                    variant='outlined'
                                    color='success'
                                    icon={<CreditCardOutlined />}
                                />
                                    : <Chip
                                        sx={{ my: 2, p: 1 }}
                                        label='Orden no pagada'
                                        variant='outlined'
                                        color='error'
                                        icon={<CreditCardOffOutlined />}
                                    />}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </AdminLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query;

    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: '/admin/orders',
                permanent: false
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage