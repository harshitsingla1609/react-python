import React, { useState } from 'react';
import { Container, Box, Typography, Button, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getSecret } from '../services/services';

export default function SecretDemo() {
  const { access } = useAuth();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const handleClick = async () => {
    setError(null);
    setMessage(null);
    try {
      const res = await getSecret(access);
      if (res.message) setMessage(res.message);
      else setError(JSON.stringify(res));
    } catch (e) {
      setError('Request failed');
    }
  };
  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h5">Protected API Demo</Typography>
        <Button variant="contained" onClick={handleClick} sx={{ mt: 2 }}>Call Protected API</Button>
        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Box>
    </Container>
  );
} 