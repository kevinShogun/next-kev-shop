import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'

interface Props {

}

export const ItemCounter = () => {
  return (
    <Box
        display='flex'
        alignItems='center'
        margin='10px 0'
    >
        <IconButton>
            <RemoveCircleOutline />
        </IconButton>
        <Typography
            sx={{
                width: 40,
                textAlign: 'center'
            }}
        >
            1
        </Typography>

        <IconButton>
            <AddCircleOutline />
        </IconButton>
    </Box>
  )
}
