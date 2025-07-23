import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Container } from '@mui/material';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SecretDemo from './pages/SecretDemo';
import Logout from './pages/Logout';
import Posts from './pages/Posts';
import AllUsers from './pages/AllUsers';

function App() {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (
    <Router>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/change-password" element={user ? <ChangePassword /> : <Navigate to="/login" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/secret" element={user ? <SecretDemo /> : <Navigate to="/login" />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/posts" element={user ? <Posts /> : <Navigate to="/login" />} />
          <Route path="/users" element={user ? <AllUsers /> : <Navigate to="/login" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
