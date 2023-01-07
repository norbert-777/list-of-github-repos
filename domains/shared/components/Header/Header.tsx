import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import React from 'react';

export const Header: FC = () => (
  <AppBar position="static">
    <Typography variant="h6" component="h1" sx={{ px: 2, py: 0.5 }}>
      List of GitHub repositories
    </Typography>
  </AppBar>
);
