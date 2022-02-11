import { Stack } from '@mui/material';
import React from 'react';

type CartProductsListProps = {
    children: React.ReactNode;
}

export const CartProductsList = ({ children }: CartProductsListProps) => {
    return (
        <Stack spacing={1}>
            {children}
            {/*{React.Children.map(children, (child) => {*/}
            {/*    return child*/}
            {/*})}*/}
        </Stack>
    )
}
