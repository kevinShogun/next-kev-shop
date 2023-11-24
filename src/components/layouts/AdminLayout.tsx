import Head from "next/head";
import { FC, ReactNode } from "react";
import { Navbar, SideMenu } from "../app";
import { AdminNavbar } from "../admin";
import { Box, Typography } from "@mui/material";

interface Props {
    title: string;
    subtitle: string;
    icon?: JSX.Element;
    children: ReactNode | ReactNode[];
}

export const AdminLayout: FC<Props> = ({
    subtitle,
    title,
    icon,
    children,
}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <nav>
                <AdminNavbar />
            </nav>
            <SideMenu />

            <main
                style={{
                    margin: "80px auto",
                    maxWidth: "1440px",
                    padding: "0px 30px",
                }}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <Typography
                        variant="h1"
                        component={'h1'}
                    >
                        {icon}
                        {" "}
                        {title}
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{ my: 2 }}
                    >
                        {subtitle}
                    </Typography>
                </Box>

                <Box className='fadeIn'>
                    {children}
                </Box>
            </main>

        </>
    );
};
