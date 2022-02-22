import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { SmallCartButton } from 'features/smal-cart-button';
import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <Box>
        <AppBar position={'fixed'}>
          <Container maxWidth="lg">
            <Toolbar>
              <Box sx={{ flexGrow: 1 }}>
                <Link href="/">
                  <a>
                    <Typography variant="h6" component="span">
                      КлонМаркет
                    </Typography>
                  </a>
                </Link>
              </Box>
              <SmallCartButton />
            </Toolbar>
          </Container>
        </AppBar>
        <Toolbar />
      </Box>
    </header>
  );
};
