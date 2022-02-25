import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { SmallCartButton } from 'features/smal-cart-button';
import Link from 'next/link';
import { NavMenu } from './NavMenu';

export const Header = () => {
  return (
    <header>
      <Box>
        <AppBar position={'fixed'}>
          <Container maxWidth="lg">
            <Toolbar>
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
                <Link href="/">
                  <a style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" component="span">
                      КлонМаркет
                    </Typography>
                  </a>
                </Link>
                <NavMenu />
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
