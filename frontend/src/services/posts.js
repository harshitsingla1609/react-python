const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/posts/';

export async function getPosts(token) {
  const res = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log(res, 'datadatadata res')

  return res.json();
}

export async function getPost(token, id) {
  const res = await fetch(API_URL + id + '/', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function createPost(token, data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updatePost(token, id, data) {
  const res = await fetch(API_URL + id + '/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deletePost(token, id) {
  const res = await fetch(API_URL + id + '/', {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res;
} 