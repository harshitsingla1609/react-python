import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h5">Profile</Typography>
        <Box mt={2}>
          <Typography>Email: {user.email}</Typography>
          <Typography>Username: {user.username}</Typography>
          <Button component={RouterLink} to="/change-password" variant="outlined" sx={{ mt: 2 }}>
            Change Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 