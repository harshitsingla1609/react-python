import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions, Alert, TextField, Pagination, Stack } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import * as postApi from '../services/posts';
import PostForm from '../components/PostForm';

export default function Posts() {
  const { access } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const fetchPosts = async (pageNum = 1, searchVal = search) => {
    setLoading(true);
    setError(null);
    try {
      const data = await postApi.getPosts(access, { page: pageNum, search: searchVal });
      setPosts(data.results || []);
      setCount(Math.ceil((data.count || 1) / 5));
    } catch (e) {
      setError('Failed to load posts');
    }
    setLoading(false);
  };

  useEffect(() => { fetchPosts(page, search); }, [page, search]); // eslint-disable-line

  const handleCreate = () => {
    setDialogMode('create');
    setEditing(null);
    setShowDialog(true);
  };

  const handleEdit = post => {
    setDialogMode('edit');
    setEditing(post);
    setShowDialog(true);
  };

  const handleDelete = async id => {
    setLoading(true);
    await postApi.deletePost(access, id);
    await fetchPosts(page, search);
    setLoading(false);
  };

  const handleSubmit = async data => {
    setLoading(true);
    if (dialogMode === 'create') {
      await postApi.createPost(access, data);
    } else if (editing) {
      await postApi.updatePost(access, editing.id, data);
    }
    setShowDialog(false);
    await fetchPosts(page, search);
    setLoading(false);
  };

  const handleSearch = e => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4">My Posts</Typography>
        <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2, mt: 2, mb: 2 }}>
          <TextField label="Search" value={searchInput} onChange={e => setSearchInput(e.target.value)} size="small" />
          <Button type="submit" variant="outlined">Search</Button>
          <Button variant="contained" onClick={handleCreate}>New Post</Button>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        {posts.length === 0 && <Typography>No posts yet.</Typography>}
        {posts.map(post => (
          <Card key={post.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2" color="text.secondary">{post.content}</Typography>
              <Typography variant="caption" color="text.secondary">{new Date(post.created_at).toLocaleString()}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleEdit(post)}>Edit</Button>
              <Button size="small" color="error" onClick={() => handleDelete(post.id)}>Delete</Button>
            </CardActions>
          </Card>
        ))}
        <Stack alignItems="center" sx={{ mt: 2 }}>
          <Pagination count={count} page={page} onChange={(_, value) => setPage(value)} color="primary" />
        </Stack>
        <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
          <DialogTitle>{dialogMode === 'create' ? 'New Post' : 'Edit Post'}</DialogTitle>
          <DialogContent>
            <PostForm initial={editing} onSubmit={handleSubmit} loading={loading} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
} 