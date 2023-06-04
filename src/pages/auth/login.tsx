/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next'
import NextLink from 'next/link'
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '@/components/layouts'


const Login: NextPage = () => {
    return (
        <AuthLayout
            title='Ingresar'
        >
            <Box
                sx={{
                    width: '100%',
                }}
            >
                <Grid container
                    spacing={3}
                >
                    <Grid item xs={12} sm={6} gap={3}
                        sx={{
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        }}
                    >
                        <Box
                            display='flex'
                            flexDirection='column'
                            gap={2}
                            sx={{
                                padding: '2rem',
                            }}
                        >
                            <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>

                            <TextField label='Correo' variant='filled' fullWidth />

                            <TextField label='Contraseña' type='password' variant='filled' fullWidth />
                            <Button
                                color='secondary'
                                variant='contained'
                                fullWidth
                                className='circular-btn'
                                size='large'
                            >

                                Ingresar
                            </Button>
                            <NextLink href={'/auth/register'} passHref legacyBehavior>
                                <Link underline='always' color='secondary'>¿No tienes cuenta?</Link>
                            </NextLink>

                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box
                            display='flex'
                            flexDirection='column'
                            sx={{
                                width: '100%',
                                bgcolor: '#F0EDEA',
                                height: '100vh',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}
                        >
                            <img
                                src='/Designer2.png'
                                style={{
                                    width: '50%',
                                }}
                                alt='Designer2.png'
                            />
                            <div
                                style={{
                                    width: '100%',
                                    height: '1px',
                                    backgroundColor: '#000',
                                    margin: '1rem',
                                }}
                            ></div>
                            <Typography
                                variant='body1'
                                component='p'
                                sx={{
                                    fontWeight: 'bold',
                                }}
                            >Sporty but Elegant and Casual Clothing</Typography>
                        </Box>
                    </Grid>
                </Grid>

            </Box>

        </AuthLayout>
    )
}

export default Login