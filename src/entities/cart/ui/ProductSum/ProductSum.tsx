import { Typography } from '@mui/material';
import React from 'react';

type ProductSumProps = {
    sum: number;
}

/**
 * TODO: Возможно лучше перенести в shared/ui
 *  и форматировать сумму с помощью какой-нибудь функции.
 */
export const ProductSum = ({sum} : ProductSumProps) => {
    return (
        <Typography sx={{ fontSize: 'default', fontWeight: 'bold' }} >
            {sum} ₽
        </Typography>
    );
}
