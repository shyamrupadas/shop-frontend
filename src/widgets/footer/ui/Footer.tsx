import React from 'react';
import { AppBar, Box, Container } from '@mui/material';

export const Footer = () => {
  return (
    <footer style={{ flexShrink: 0, bottom: 0 }}>
      <Box>
        <AppBar
          position="static"
          style={{ paddingTop: '12px', paddingBottom: '12px' }}
        >
          <Container maxWidth="lg">&#169; КлонМаркет 2022</Container>
        </AppBar>
      </Box>
    </footer>
  );
};
