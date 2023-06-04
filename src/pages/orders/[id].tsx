import { NextPage } from 'next'
import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import { CardList, OrdenSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

const OrderPage: NextPage = () => {
    return (
        <ShopLayout
            title={"Resumen de orden - 25"}
            pageDescription={"Resumen de la orden de compra No. 25"}
        >
            <Typography variant="h1" component="h1">
                Orden: #25
            </Typography>
            {/*<Chip
                sx={{my: 2, p: 1}}
                label='Pendiente de pago'
                variant='outlined'
                color='error'
                icon={<CreditCardOffOutlined/>}
    />*/}
            <Chip
                sx={{ my: 2, p: 1 }}
                label='Pagada'
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined />}
            />

            <br />
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CardList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2"></Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display={'flex'} justifyContent='end'>
                                <NextLink href='/checkout/address' passHref legacyBehavior>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>

                            <Typography variant="subtitle1">Dirección de entrega</Typography>
                            <Typography>Kevin García</Typography>
                            <Typography>Example direction</Typography>
                            <Typography>336 - JK direction</Typography>
                            <Typography>Nicaragua</Typography>
                            <Typography>+505 8228-0258</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display={'flex'} justifyContent='end'>
                                <NextLink href='/cart' passHref legacyBehavior>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>
                            <OrdenSummary />

                            <Box
                                sx={{
                                    mt: 3,
                                }}
                            >
                                {/**Pagar */}
                                <h1 color="secondary">
                                    Pagar
                                </h1>
                                <Chip
                                    sx={{ my: 2, p: 1 }}
                                    label='Pendiente de pago'
                                    variant='outlined'
                                    color='error'
                                    icon={<CreditCardOffOutlined />}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default OrderPage