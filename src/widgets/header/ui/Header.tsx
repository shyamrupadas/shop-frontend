import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { SmallCartButton } from 'features/smal-cart-button';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              КлонМаркет
            </Typography>
            <SmallCartButton />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
