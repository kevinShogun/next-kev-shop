import { useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material'
import { CreditCardOffOutlined, CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { tesloApi } from '@/api';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';
import { ShopLayout } from '@/components/layouts'
import { CardList, OrdenSummary } from '@/components/cart'

interface Props {
    order: IOrder
}

interface OrdersResponseBody {
    id: string;
    status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED"
    | "CREATED"
}


const OrderPage: NextPage<Props> = ({ order }) => {

    const router = useRouter();
    const [isPaying, setIsPaying] = useState(false);

    const { shippingAddress } = order;
    const onOrderComplete = async (details: OrdersResponseBody) => {
        if (details.status !== 'COMPLETED') {
            return alert('no hay pago en Paypal');
        }
        setIsPaying(true);

        try {
            const { data } = await tesloApi.post(`/order/pay`, {
                transactionId: details.id,
                orderId: order._id
            });

            router.reload();

        } catch (error) {
            setIsPaying(false);
            console.log(error);
            alert('Error')
        }
    }


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

                                <Box
                                    display='flex'
                                    justifyContent='center'
                                    className='fadeIn'
                                    sx={{
                                        display: isPaying ? 'flex' : 'none'
                                    }}
                                >
                                    <CircularProgress />
                                </Box>

                                <Box
                                    sx={{ display: isPaying ? 'none' : 'flex', flex: 1, flexDirection: 'column' }}
                                >
                                    {
                                        order.isPaid ? (
                                            <Chip
                                                sx={{ my: 2, p: 1 }}
                                                label='Orden pagada'
                                                variant='outlined'
                                                color='success'
                                                icon={<CreditCardOutlined />}
                                            />
                                        ) : (
                                            <PayPalButtons
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    currency_code: 'USD',
                                                                    value: order.total.toString(),
                                                                }
                                                            }
                                                        ]
                                                    })
                                                }}
                                                onApprove={(data, actions) => {
                                                    //@ts-ignore
                                                    return actions.order.capture().then(function (details) {
                                                        onOrderComplete(details);
                                                        // const name = details?.payer.name?.given_name;
                                                        // alert(`Gracias ${name}. Tu pago ha sido procesado correctamente.`);
                                                    })
                                                }}
                                            />
                                        )
                                    }
                                </Box>
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