import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'

interface Props {
    currentValue: number,
    updateQuantity: (quantity: number) => void,
    maxValue: number,
}

export const ItemCounter = ({
    currentValue,
    maxValue,
    updateQuantity
}: Props) => {

    const increaseBy = (n: number) => {
        if (n === -1) {
            if (currentValue === 1) return;
            return updateQuantity(currentValue - 1)
        }
        if (currentValue >= maxValue) return;
        updateQuantity(currentValue + 1);
    }

    return (
        <Box
            display='flex'
            alignItems='center'
            margin='10px 0'
        >
            <IconButton
                onClick={() => increaseBy(-1)}
            >
                <RemoveCircleOutline />
            </IconButton>

            <Typography
                sx={{
                    width: 40,
                    textAlign: 'center'
                }}
            >
                {currentValue}
            </Typography>

            <IconButton
                onClick={() => increaseBy(1)}
            >
                <AddCircleOutline />
            </IconButton>
        </Box>
    )
}
