import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Snackbar,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Alert,
  GlobalStyles,
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';
import loginImage from '../assets/login2.jpg';

const theme = createTheme();

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Invalid email address')
        .required('Email cannot be left blank'),
      password: yup.string().required('Password cannot be left blank'),
    }),
    onSubmit: (values) => {
      fetch('http://localhost:8765/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            localStorage.setItem('jwt_token', data.jwt_token);
            localStorage.setItem('userName', data.email);
            navigate('/');
          } else {
            setSnackbarOpen(true);
          }
        })
        .catch(() => setSnackbarOpen(true));
    },
  });

  const handlePasswordToggle = () => setShowPassword((prev) => !prev);
  const handleSnackbarClose = (_, reason) => {
    if (reason !== 'clickaway') setSnackbarOpen(false);
  };

  return (
    <div data-testid="loginbodyclass" className="container user-login-form" >
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: 'grey',
              margin: 0,
              padding: 0,
              height: '100%',
              width: '100%',
            },
          }}
        />
        <Grid container spacing={0} sx={{ height: '100vh', justifyContent: 'center',  }}>
          <CssBaseline />
          <Grid
            sx={{
              gridColumn: { xs: '1 / span 12', md: '8 / span 5' },
            }}
            component={Paper}
            elevation={6}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main', backgroundColor: "#40135C" }}>
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handlePasswordToggle}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {formik.touched.password && formik.errors.password && (
                  <Typography color="error" variant="body2">
                    {formik.errors.password}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#40135C" }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="space-between">
                  <Grid>
                  </Grid>
                </Grid>
              </Box>
              
            </Box>
          </Grid>
          
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            Invalid username or password!
          </Alert>
        </Snackbar>
        
      </ThemeProvider>
      
    </div>
  );
}
