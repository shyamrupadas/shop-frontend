import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { Product } from 'shared/types';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type ProductCardProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  productSum: number;
  children: React.ReactNode;
};

export const ProductCard = ({
  product,
  productSum,
  children,
  isOpen,
  onClose,
}: ProductCardProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} scroll={'body'}>
      <DialogTitle>
        <IconButton
          aria-label="Закрыть"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers={false}>
        <Grid container spacing={1} sx={{ p: 0, pt: 2 }}>
          <Grid item xs={6}>
            <img
              src={product.iconUrl}
              alt={product.title}
              style={{ maxWidth: '100%' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="h2">
              {product.name}
            </Typography>
            <Typography variant="body2" component="p" color={'text.se'}>
              {product.unitMeasure}
            </Typography>
            <Typography
              variant="h5"
              color="success.main"
              fontWeight={'bolder'}
              mt={2}
            >
              Цена: {product.price} ₽
            </Typography>

            <Paper elevation={0} sx={{ mt: 2 }}>
              <Grid
                container
                sx={{ backgroundColor: 'rgba(232,232,232,0.58)' }}
                alignItems={'center'}
                p={1}
              >
                <Grid item xs={6} alignItems={'center'}>
                  <Typography
                    variant="h5"
                    color="success.main"
                    fontWeight={'bolder'}
                  >
                    {productSum || 0} ₽
                  </Typography>
                </Grid>
                <Grid item xs={6} p={0} textAlign={'right'}>
                  {children}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <Paper sx={{ backgroundColor: 'rgba(232,232,232,0.58)' }}>
        <DialogContent dividers={false}>
          <Typography sx={{ mt: 2 }} fontWeight={'bolder'}>
            Описание
          </Typography>
          <Typography sx={{ mt: 2 }}>{product.description}</Typography>
        </DialogContent>
      </Paper>
    </Dialog>
  );
};
