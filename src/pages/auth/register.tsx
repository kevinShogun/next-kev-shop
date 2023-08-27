/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from 'react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material'
import { ErrorOutlineRounded } from '@mui/icons-material'
import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils'
import { tesloApi } from '@/api'
import { AuthContext } from '@/context'
import { useRouter } from 'next/router'


type FormData = {
    name: string;
    email: string
    password: string;
    confirmPassword: string;
}

const RegisterPage: NextPage = () => {

    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const {registerUser} = useContext(AuthContext);
    const router = useRouter();
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>();

    const onRegisterUser = async (data: FormData) => {
        const {name, email, password} = data;
        const {hasError, message} = await registerUser(name,email,password);

        if (hasError) {
            setIsError(true);
            setErrorMsg(message || "");
            setTimeout(() => {
                setIsError(false);
            }, 5000);

            return;
        }

        router.replace('/');

    }

    const validatePasswordMatch = (value: string) => {
        const { password } = getValues();
        return value === password || 'Las contraseña no son iguales';
    };

    return (
        <AuthLayout title='Crear cuenta'>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} gap={3}
                        sx={{
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        }}
                    >
                        <form
                            onSubmit={handleSubmit(onRegisterUser)}
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
                                <Typography variant='h1' component='h1'>Cree una cuenta</Typography>

                                <Chip
                                    label={errorMsg}
                                    color='error'
                                    icon={<ErrorOutlineRounded/>}
                                    className='fadeIn'
                                    sx={{
                                        m: 2,
                                        display: isError ? 'flex' : "none"
                                    }}
                                />

                                <TextField label='Nombre completo' variant='filled' fullWidth
                                    {...register('name', {
                                        required: 'Este campo es requerido',
                                        minLength: {
                                            value: 2,
                                            message: 'Mínimo 2 caracteres'
                                        }
                                    })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />

                                <TextField label='Correo' variant='filled' fullWidth type='email'
                                    {...register('email', {
                                        required: 'Este campo es requerido',
                                        validate: validations.isEmail
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />

                                <TextField label='Contraseña' type='password' variant='filled' fullWidth
                                    {...register('password', {
                                        required: 'Este campo es requeido',
                                        minLength: {
                                            value: 6,
                                            message: 'La contraseña debde tener mínimo 6 caracteres'
                                        }
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                                <TextField label='Repita la contraseña' type='password' variant='filled' fullWidth
                                    {...register('confirmPassword', {
                                        required: 'Este campo es requerido',
                                        validate: validatePasswordMatch,
                                        minLength: {
                                            value: 6,
                                            message: 'La contraseña debde tener mínimo 6 caracteres'
                                        }
                                    })}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
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
                                <NextLink href={'/auth/login'} passHref legacyBehavior>
                                    <Link underline='always' color='secondary'>¿Ya tienes cuenta?</Link>
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

export default RegisterPage