/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { ErrorOutlineRounded } from '@mui/icons-material'
import { validations } from '@/utils'
import { AuthLayout } from '@/components/layouts'
import { AuthContext } from '@/context'


type FormData = {
    email: string
    password: string
}

const Login: NextPage = () => {

    const { loginUser } = useContext(AuthContext);
    const router = useRouter();
    const [isError, setIsError] = useState(false);
    const [destination, setDestination] = useState('/');
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();


    useEffect(() => {
      setDestination(router.query.p?.toString() || '/');
    }, [router.query.p]);
    

    const onLoginUser = async ({ email, password }: FormData) => {

        const isValidLogin = await loginUser(email, password)

        if (!isValidLogin) {
            setIsError(true);
            setTimeout(() => { setIsError(false); }, 5000);

            return;
        }        
        router.replace(destination);
    }

    return (
        <AuthLayout title='Ingresar'>
            <Box sx={{ width: '100%', }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} gap={3}
                        sx={{
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        }}
                    >
                        <form
                            onSubmit={handleSubmit(onLoginUser)}
                            noValidate
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

                                <Chip
                                    label='Usuario y/o contraseña no son válidos'
                                    color='error'
                                    icon={<ErrorOutlineRounded />}
                                    className='fadeIn'
                                    sx={{
                                        m: 2,
                                        display: isError ? 'flex' : "none"
                                    }}
                                />

                                <TextField
                                    type='email'
                                    label='Correo'
                                    variant='filled'
                                    fullWidth
                                    {...register('email', {
                                        required: 'Este campo es requerido',
                                        validate: validations.isEmail
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />

                                <TextField
                                    label='Contraseña'
                                    type='password'
                                    variant='filled'
                                    fullWidth
                                    {...register('password', {
                                        required: 'Este campo es requerido',
                                        minLength: {
                                            value: 6,
                                            message: 'Mínimo 6 caracteres'
                                        }
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                                <Button
                                    color='secondary'
                                    variant='contained'
                                    fullWidth
                                    className='circular-btn'
                                    size='large'
                                    type='submit'
                                >

                                    Ingresar
                                </Button>
                                <NextLink href={`/auth/register?p=${destination}`} passHref legacyBehavior>
                                    <Link underline='always' color='secondary'>¿No tienes cuenta?</Link>
                                </NextLink>
                            </Box>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box
                            display='flex'
                            flexDirection='column'
                            sx={{
                                width: '100%',
                                bgcolor: '#F0EDEA',
                                height: '100vh',
                                '@media (max-width: 600px)': {
                                    height: '50vh',
                                },
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