import React from 'react';
import { AppBar, Box, Container } from '@mui/material';

export const Footer = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">(c) КлонМаркет 2022</Container>
      </AppBar>
    </Box>
  );
};
