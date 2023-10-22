import { NextPage, GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { dbOrders } from '@/database';
import { ShopLayout } from '@/components/layouts'
import { CardList, OrdenSummary } from '@/components/cart'
import { IOrder } from '@/interfaces';


interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order;

    return (
        <ShopLayout
            title={`Resumen de la orden - ${order._id}`}
            pageDescription={"Resumen de la orden de compra No." + order._id}
        >
            <Typography variant="h1" component="h1">
                Orden: {order._id}
            </Typography>
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

                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                {
                                    order.isPaid ? (
                                        <Chip
                                            sx={{ my: 2, p: 1 }}
                                            label='Pendiente de pago'
                                            variant='outlined'
                                            color='error'
                                            icon={<CreditCardOffOutlined />}
                                        />
                                    ) : (
                                        <h1 color="secondary">
                                            Pagar
                                        </h1>
                                    )
                                }
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query;


    const session: any = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: `auth/login?p=/orders/${id}`,
                permanent: false
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }

    if (order.user !== session.user._id) {
        return {
            redirect: {
                destination: '/orders/history',
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