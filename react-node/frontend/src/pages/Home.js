import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user ? user.username : 'Guest'}!
      </Typography>

      {user && (
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                User Information
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1">
                <strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  component={RouterLink}
                  to="/posts"
                  variant="contained"
                  color="primary"
                >
                  View Posts
                </Button>
                <Button
                  component={RouterLink}
                  to="/profile"
                  variant="outlined"
                  color="primary"
                >
                  Edit Profile
                </Button>
                <Button
                  component={RouterLink}
                  to="/users"
                  variant="outlined"
                  color="secondary"
                >
                  View All Users
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
} 