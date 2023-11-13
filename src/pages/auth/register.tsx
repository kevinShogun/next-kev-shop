/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { Box, Grid, Typography, TextField, Button, Link, Chip, Divider } from '@mui/material'
import { ErrorOutlineRounded } from '@mui/icons-material'
import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils'
import { AuthContext } from '@/context'
import { useRouter } from 'next/router'
import { getSession, signIn } from 'next-auth/react'


type FormData = {
    name: string;
    email: string
    password: string;
    confirmPassword: string;
}

const RegisterPage: NextPage = () => {

    const router = useRouter();

    const {registerUser} = useContext(AuthContext);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [destination, setDestination] = useState('/');
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>();

    useEffect(() => {
        const { error } = router.query;
        if(error){
            setIsError(true);
            setTimeout(() => { setIsError(false); }, 5000);
        }
    }, [router]);
      

    const onRegisterUser = async (data: FormData) => {
        const { name, email, password } = data;
        const { hasError, message  } = await registerUser(name,email,password);

        if (hasError) {
            setIsError(true);
            setErrorMsg(message || "");
            setTimeout(() => {
                setIsError(false);
            }, 5000);

            return;
        }

        await signIn('credentials', { email, password });

        // router.replace(destination);
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
                                <NextLink href={`/auth/login?p=${destination}`} passHref legacyBehavior>
                                    <Link underline='always' color='secondary'>¿Ya tienes cuenta?</Link>
                                </NextLink>

                            </Box>
                        </form>
                        <Box>
                            <Divider sx={{width: "100%", mb: 2, ml: 2}}/>

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


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });
    const { p = '/' } = query;
    
    if(session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props:{

        }
    }
}


export default RegisterPage