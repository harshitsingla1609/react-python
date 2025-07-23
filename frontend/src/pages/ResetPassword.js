import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';
import { resetPassword } from '../services/services';

export default function ResetPassword() {
  const location = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const params = new URLSearchParams(location.search);
  const uid = params.get('uid');
  const token = params.get('token');
  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const res = await resetPassword(uid, token, newPassword);
    if (res.detail && res.detail.includes('reset')) setSuccess(true);
    else setError(JSON.stringify(res));
  };
  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h5" align="center">Reset Password</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField label="New Password" type="password" fullWidth margin="normal" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Reset Password</Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>Password has been reset. You can now log in.</Alert>}
        </Box>
      </Box>
    </Container>
  );
} 