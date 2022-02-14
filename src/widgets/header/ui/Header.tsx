import React from 'react';
import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              КлонМаркет
            </Typography>
            <IconButton aria-label="cart">
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartIcon color={'inherit'} />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
