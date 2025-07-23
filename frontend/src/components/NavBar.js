import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Full Stack Auth App
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={RouterLink} to="/">Home</Button>
            <Button color="inherit" component={RouterLink} to="/posts">Posts</Button>
            <Button color="inherit" component={RouterLink} to="/profile">Profile</Button>
            <Button color="inherit" component={RouterLink} to="/logout">Logout</Button>
            <Button color="inherit" component={RouterLink} to="/users">All Users</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">Login</Button>
            <Button color="inherit" component={RouterLink} to="/signup">Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
} 