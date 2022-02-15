import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { SmallCartButton } from 'features/smal-cart-button';
import Link from 'next/link';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Link href="/">
              <a>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  КлонМаркет
                </Typography>
              </a>
            </Link>
            <SmallCartButton />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
