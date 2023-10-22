/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useState } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { getProviders, getSession, signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { Box, Button, Chip, Grid, Link, TextField, Typography, Divider } from '@mui/material'
import { ErrorOutlineRounded } from '@mui/icons-material'
import { validations } from '@/utils'
import { AuthLayout } from '@/components/layouts'


type FormData = {
    email: string
    password: string
}

const Login: NextPage = () => {

    // const { loginUser } = useContext(AuthContext);
    const router = useRouter();
    const [isError, setIsError] = useState(false);
    const [destination, setDestination] = useState('/');
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [providers, setProviders] = useState<any>({})


    useEffect(() => {
        getProviders().then( prov => {
          setProviders(prov)
        })
    }, [])
    

    useLayoutEffect(() => {
        const { error } = router.query;
        if(error){
            setIsError(true);
            setTimeout(() => { setIsError(false); }, 5000);
        }
    }, [router]);
    

    const onLoginUser = async ({ email, password }: FormData) => {
        try {
            await signIn('credentials',{ email, password} );
        } catch (error) {
            setIsError(true);
            setTimeout(() => { setIsError(false); }, 5000);
            return;
        }
        // router.replace(destination);
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
                        <Box>
                            <Divider sx={{width: "100%", mb: 2, ml: 2}}/>
                            {
                                providers && Object.values(providers).map(( prov: any ) => {
                                    if(prov.id === "credentials") return (<div key={prov.id}></div>)
                                    return (
                                        <Button
                                            key={prov.id} variant='outlined' fullWidth
                                            color='primary' sx={{m: 1, }}
                                            onClick={() => signIn(prov.id)}
                                        >
                                            {prov.name}
                                        </Button>
                                    )
                                })
                            }
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

export default Login;