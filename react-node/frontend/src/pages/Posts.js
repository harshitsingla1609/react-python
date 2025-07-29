import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Card, CardContent, CardActions, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Alert, Grid } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/services';

export default function Posts() {
  const { token, user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await api.getAllPosts(token);
      if (res.posts) {
        setPosts(res.posts);
      }
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    try {
      const res = await api.createPost(token, title, content);
      if (res.post) {
        setPosts([res.post, ...posts]);
        setTitle('');
        setContent('');
        setOpenDialog(false);
      }
    } catch (err) {
      setError('Failed to create post');
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await api.deletePost(token, postId);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Posts</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Create Post
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Grid container spacing={3}>
          {posts.map(post => (
            <Grid item xs={12} key={post._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    By {post.author?.username || 'Unknown'} on {new Date(post.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    {post.content}
                  </Typography>
                </CardContent>
                {post.author?._id === user?._id && (
                  <CardActions>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeletePost(post._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <TextField
              label="Content"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleCreatePost} variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
} 