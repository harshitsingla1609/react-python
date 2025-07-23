import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { register, login } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const res = await register(email, username, password, password2);
    console.log(res, 'resresres')
    if (!res.success) setError(JSON.stringify(res.error));
    else {
      setSuccess(true);
      // Auto-login after successful registration
      const loginRes = await login(username, password); // Try username first
      if (!loginRes.success) {
        // If login with username fails, try email
        const loginResEmail = await login(email, password);
        if (loginResEmail.success) {
          navigate('/');
        } else {
          setError('Registered but failed to auto-login. Please try logging in.');
        }
      } else {
        navigate('/');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h5" align="center">Sign Up</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
          <TextField label="Confirm Password" type="password" fullWidth margin="normal" value={password2} onChange={e => setPassword2(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Register</Button>
          <Box mt={2} textAlign="center">
            <Link component={RouterLink} to="/login">Already have an account? Login</Link>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>Registration successful! Logging you in...</Alert>}
        </Box>
      </Box>
    </Container>
  );
} 