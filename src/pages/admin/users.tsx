import React, { useEffect, useState } from 'react'
import { Grid, MenuItem, Select, Typography } from '@mui/material'
import { AdminLayout } from '@/components/layouts'
import { GroupOutlined } from '@mui/icons-material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import useSWR from 'swr'
import { IUser } from '@/interfaces'
import { tesloApi } from '@/api'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { IsErrorPage } from '@/components/app'

const UsersPage = () => {


    const { data, error} = useSWR<IUser[]>('/api/admin/users');

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if(data) setUsers(data);
    }, [data])
    

    if(!error && !data){
        return<></>
    }

    if(error){
        console.log(error);
        return <IsErrorPage/>
    }


    const onRolUpdated = async (userId: string, newRole: string) => {

        const previoUsers = users.map(user => ({...user}));

        const updatedUsers = users.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
        );

        setUsers(updatedUsers);

        try {
            await tesloApi.put('/admin/users', {
                userId,
                role: newRole,
            });
        } catch (error) {
            console.log(error);
            alert('No se pudo cambiar el rol');
            setUsers(previoUsers);
        }
    };

    const columns: GridColDef[] = [
        {field: 'email', headerName: 'Correo', width: 250},
        {field: 'name', headerName: 'Nombre completo', width: 300},
        {
            field: 'role', 
            headerName: 'Rol', 
            width: 300,
            renderCell: ({row}:GridRenderCellParams) => {
                return(
                    <Select
                        value={row.role}
                        label='Rol'
                        sx={{width: '300px'}}
                        onChange={({target}) => onRolUpdated(row.id, target.value)}
                    >
                        <MenuItem value='admin'>Administrador</MenuItem>
                        <MenuItem value='client'>Cliente</MenuItem>
                        <MenuItem value='super-user'>Super User</MenuItem>
                        <MenuItem value='SEO'>SEO</MenuItem>
                    </Select>
                )
            }
        },
    ];
    
    // if users map is not a function return to home
    if(!users.map) return <IsErrorPage/>

    const rows = users.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }));

    return (
        <AdminLayout
            title='Usuarios'
            subtitle='Listado de usuario'
            icon={<GroupOutlined />}
        >
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 5 }
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                    />
                </Grid>
            </Grid>
        </AdminLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({req, res}) => {

    const session: any = await getSession({req});

    if(!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/admin/users',
                permanent: false
            }
        }
    }

   
    return {props:{}}
}

export default UsersPage