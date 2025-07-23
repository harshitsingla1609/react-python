import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <Box mt={4}>
      <Typography variant="h4">Welcome, {user ? user.username : 'Guest'}!</Typography>
      {user && (
        <Button component={RouterLink} to="/secret" variant="contained" sx={{ mt: 2 }}>
          Try Protected API
        </Button>
      )}
    </Box>
  );
} 