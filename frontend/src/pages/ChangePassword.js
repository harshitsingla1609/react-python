import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { changePassword } from '../services/services';

export default function ChangePassword() {
  const { access } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const res = await changePassword(access, oldPassword, newPassword);
    if (res.detail) setSuccess(true);
    else setError(JSON.stringify(res));
  };
  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h5" align="center">Change Password</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField label="Old Password" type="password" fullWidth margin="normal" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
          <TextField label="New Password" type="password" fullWidth margin="normal" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Change Password</Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>Password changed successfully!</Alert>}
        </Box>
      </Box>
    </Container>
  );
} 