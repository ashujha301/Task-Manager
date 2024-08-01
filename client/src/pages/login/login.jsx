import { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link, AppBar, Toolbar } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-manager-nx1i.onrender.com'
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('authToken', token); // Store the token
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error logging in:', error);
      // Optionally, set error message state to display to the user
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${api.defaults.baseURL}/auth/google`;
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          <Button color="inherit" onClick={() => navigate('/register')}>Signup</Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link href="#" variant="body2" onClick={() => navigate('/register')}>
                  Signup
                </Link>
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{ mt: 2 }}
            >
              Login with Google
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
