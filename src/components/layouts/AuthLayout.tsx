import { Box } from "@mui/material";
import Head from "next/head"
import { FC, ReactNode } from "react";

interface Props {
    title: string;
    children: ReactNode | ReactNode[]
}

export const AuthLayout:FC<Props> = ({children, title}) => {
  return (
    <>
        <Head>
            <title>{title}</title>
        </Head>
        <main>
            <Box>
                {children}
            </Box>
        </main>
    </>
  )
}
