import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

export default function PostForm({ initial, onSubmit, loading }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [content, setContent] = useState(initial?.content || '');

  useEffect(() => {
    setTitle(initial?.title || '');
    setContent(initial?.content || '');
  }, [initial]);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField label="Title" fullWidth margin="normal" value={title} onChange={e => setTitle(e.target.value)} required />
      <TextField label="Content" fullWidth margin="normal" value={content} onChange={e => setContent(e.target.value)} multiline rows={4} required />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </Box>
  );
} 