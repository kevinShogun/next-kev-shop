import { Fragment, useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { AuthContext, UiContext } from "@/context"
import { Box, ButtonBase, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, DashboardOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"


export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
    const { user, isLoggedIn, logout } = useContext(AuthContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [userRol, setUserRol] = useState("");

    useEffect(() => {
        if (user) {
            const { role } = user;
            setUserRol(role);
        }
    }, [user])



    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        onNavigate(`/search/${searchTerm}`);
    }

    const onNavigate = (url: string) => {
        router.push(url);
        setTimeout(() => {
            toggleSideMenu();
        }, 300);
    }

    return (
        <Drawer
            open={isMenuOpen}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={
                () => toggleSideMenu()
            }
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                <List>
                    <ListItem
                        sx={{ display: { xs: 'flex', sm: 'none' } }}
                    >
                        <Input
                            autoFocus
                            type='text'
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                            }}
                            onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={onSearchTerm}
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    {isLoggedIn &&
                        <Fragment>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItem>

                            <ListItem button
                                onClick={() => {
                                    onNavigate('/orders/history')
                                }}
                            >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItem>
                        </Fragment>
                    }


                    <ListItem 
                        button sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => onNavigate('/category/men')}
                    >
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>

                    <ListItem 
                        button sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => onNavigate('/category/women')}
                    >
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>

                    <ListItem 
                        button sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => onNavigate('/category/kid')}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItem>
                    {
                        isLoggedIn ?
                            <ListItem button
                                onClick={logout}
                            >
                                <ListItemIcon>
                                    <LoginOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Salir'} />
                            </ListItem>
                            :
                            <ListItem button
                                onClick={() =>{
                                    onNavigate(`/auth/login?p=${router.asPath}`)
                                }}
                            >
                                <ListItemIcon>
                                    <VpnKeyOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Ingresar'} />
                            </ListItem>
                    }
                    {
                        /* Admin */
                        userRol === 'admin' &&
                        <Fragment>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>
                            <ListItem 
                                button
                                onClick={() => { onNavigate('/admin/') }}
                            >
                                <ListItemIcon>
                                    <DashboardOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} />
                            </ListItem>
                            <ListItem 
                                button
                                onClick={() => { onNavigate('/admin/') }}
                            >
                                <ListItemIcon>
                                    <CategoryOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItem>
                            <ListItem 
                                button
                                onClick={() => { onNavigate('/admin/') }}
                            >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItem>
                            <ListItem button
                                onClick={() => { onNavigate('/admin/users') }}
                            
                            >
                                <ListItemIcon>
                                    <AdminPanelSettings />
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>
                        </Fragment>
                    }
                </List>
            </Box>
        </Drawer>
    )
}