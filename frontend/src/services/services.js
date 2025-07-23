const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/auth/';

export async function register(email, username, password, password2) {
  const res = await fetch(API_URL + 'register/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password, password2 })
  });
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(API_URL + 'login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  console.log(res, 'resresres')
  
  return res.json();
}

export async function refreshToken(refresh) {
  const res = await fetch(API_URL + 'token/refresh/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh })
  });
  return res.json();
}

export async function logout(refresh) {
  const res = await fetch(API_URL + 'logout/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh })
  });
  return res;
}

export async function getUser(token) {
  const res = await fetch(API_URL + 'user/', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function updateUser(token, data) {
  const res = await fetch(API_URL + 'user/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function changePassword(token, old_password, new_password) {
  const res = await fetch(API_URL + 'user/change-password/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ old_password, new_password })
  });
  return res.json();
}

export async function forgotPassword(email) {
  const res = await fetch(API_URL + 'password-reset/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return res.json();
}

export async function resetPassword(uid, token, new_password) {
  const res = await fetch(API_URL + 'password-reset-confirm/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, token, new_password })
  });
  return res.json();
}

export async function getSecret(token) {
  const url = (process.env.REACT_APP_API_URL || 'http://localhost:8000/api/') + 'secret/';
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
} 