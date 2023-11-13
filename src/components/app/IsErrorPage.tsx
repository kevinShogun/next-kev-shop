import React from 'react'
import { ShopLayout } from '../layouts'
import { Box, Link, Typography } from '@mui/material'
import Lottie from "lottie-react";
import animation404 from "../../assets/preview.json";
import NextLink from "next/link";

export const IsErrorPage = () => {
    return (
        <ShopLayout
            title="Error"
            pageDescription='Error'
            imageFullUrl='https://assets-global.website-files.com/5fcea945ec798942a2f42746/61424c3d98c12d2c6116907a_discords-404-page.png'
        >
            <Box>
                <Typography variant='h1' component={"h1"} color={'error'}
                    sx={{
                        fontSize: '3rem',
                        fontWeight: 700,
                        lineHeight: '3rem',
                        letterSpacing: '-0.01562em',
                        textTransform: 'uppercase',
                        textAlign: 'center'
                    }}
                >Error</Typography>
                <br />
                <Typography
                    color={'ButtonText'}
                    sx={{
                        fontSize: '1.25rem',
                        fontWeight: 400,
                        lineHeight: '1.6',
                        letterSpacing: '0.0075em',
                        textAlign: 'center'
                    }}
                    variant='body1'>Error al cargar la información</Typography>
                <br />
                <Typography variant='body2'>
                    La página a la que intentaste acceder no está disponible por alguna de estas razones: puede que no tengas los permisos necesarios para verla, o puede que se haya producido un error en el servidor. Te pedimos disculpas por las molestias y te invitamos a regresar a la página anterior o a contactar con el administrador del sitio para resolver el problema.
                </Typography>

                <Box display="flex" justifyContent="center" alignItems="center"
                flexDirection={'column'}
                >
                    <Lottie
                        animationData={animation404}
                        style={{ height: "300px", width: "300px" }}
                    />
                <NextLink href="/" passHref legacyBehavior>
                    <Link typography="h5" color="secondary"
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        Regresar al inicio
                    </Link>
                </NextLink>
                </Box>
            </Box>
        </ShopLayout>
    )
}
