import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/services';

export default function ChangePassword() {
  const { token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const res = await api.changePassword(token, currentPassword, newPassword);
    if (res.message) {
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
    } else {
      setError('Failed to change password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>Change Password</Typography>
        <Paper sx={{ p: 3, mt: 2 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              margin="normal"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Change Password
            </Button>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>
            Password changed successfully!
          </Alert>}
        </Paper>
      </Box>
    </Container>
  );
} 