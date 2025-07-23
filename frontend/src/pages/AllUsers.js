import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Card, CardContent, List, ListItem, ListItemText, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function AllUsers() {
  const { access } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('http://localhost:8000/api/auth/all-users/', {
          headers: { 'Authorization': `Bearer ${access}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Failed to fetch users');
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setError('Unexpected response from server');
        }
      } catch (e) {
        setError(e.message);
      }
    }
    fetchUsers();
  }, [access]);

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4">All Users & Their Posts</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {Array.isArray(users) && users.map(user => (
          <Card key={user.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">{user.username} ({user.email})</Typography>
              <Typography variant="subtitle2">Posts:</Typography>
              {user.posts.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No posts.</Typography>
              ) : (
                <List>
                  {user.posts.map(post => (
                    <ListItem key={post.id} alignItems="flex-start">
                      <ListItemText
                        primary={post.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {post.content}
                            </Typography>
                            <br />
                            <Typography component="span" variant="caption" color="text.secondary">
                              {new Date(post.created_at).toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
} 