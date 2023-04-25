/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, FormControl, FormControlLabel, RadioGroup, Radio, FormLabel, } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from './icon';
import { signin, signup, forgotPassword, signinWithGoogle } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';
import './auth.css';
const initialState = { role: '', firstName: '', lastName: '', email: '', password: '', confirmPassword: '', tel:'', location:'', gender:'' };

const SignUp = () => {
  const errormessage = useSelector((state) => state.auth.error);
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const [error, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic form validation
    let error = {};
    if (!form.role) {
      error.role = 'Please select a role';
    }
    if (!form.firstName || form.firstName.length < 4 || /\d/.test(form.firstName)) {
      error.firstName = 'Please enter a valid first name containing at least 4 characters and no numbers';
    }
    if (!form.lastName || form.lastName.length < 4 || /\d/.test(form.lastName)) {
      error.firstName = 'Please enter a valid last name containing at least 4 characters and no numbers';
    }
    if (!form.email) {
      error.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      error.email = 'Please enter a valid email address';
    }
    if (!form.password || form.password.length < 8 || !/[a-zA-Z]/.test(form.password) || !/\d/.test(form.password) || !/[!@#$%^&*()_+\-=]/.test(form.password)) {
      error.password = 'Please enter a valid password containing at least 8 characters, one letter, one number, and a special characters';
    }
    if (form.password !== form.confirmPassword) {
      error.confirmPassword = 'Passwords do not match';
    }
    setErrors(error);

    // If there are no error, submit the form

    if (isForgotPassword) {
      if (Object.keys(error).length === 0) {
        dispatch(forgotPassword(form.email));
        // Show a success message to the user
        alert('An email has been sent to reset your password.');
      }
    } else if (isSignup) {
      if (Object.keys(error).length === 0) {
        dispatch(signup(form, history));
      }
    } else {
      dispatch(signin(form, history));
    }
  };
  const googleSuccess = async (res) => {
    const googleUser = { ...res?.profileObj, token: res?.tokenId };
    try {
      dispatch(signinWithGoogle(googleUser, history));
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section className='hero1'>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={6}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : isForgotPassword ? 'Forgot Password' : 'Sign in'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>          {
            isSignup && (
              <>
                <Grid container spacing={2}>
                  <div>
                    Register As
                    <input
                      type="radio"
                      name="role"
                      onChange={handleChange}
                      value="Recruiter"
                      required
                    />
                    Recruiter
                    <input
                      type="radio"
                      name="role"
                      onChange={handleChange}
                      value="Condidate"
                      required
                    />
                    Condidate
                  </div>
                  {error.role && <span className="error-message">{error.role}</span>}
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  {error.firstName && <span className="error-message">{error.firstName}</span>}
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                  {error.lastName && <span className="error-message">{error.lastName}</span>}
                  <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                  {error.email && <span className="error-message">{error.email}</span>}
                  <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                  {error.password && <span className="error-message">{error.password}</span>}
                  <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />
                  {error.confirmPassword && <span className="error-message">{error.confirmPassword}</span>}
                  <Input name="tel" label="Phone Number" handleChange={handleChange} type="tel" />
                  {error.tel && <span className="error-message">{error.tel}</span>}
                  <Input name="location" label="Location" handleChange={handleChange} />
                  {error.location && <span className="error-message">{error.location}</span>}
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      onChange={handleChange}
                      value="Male"
                      required
                    />
                    Male
                    <input
                      type="radio"
                      name="gender"
                      onChange={handleChange}
                      value="Female"
                      required
                    />
                    Female
                  </div>
                  
                </Grid>
                {errormessage && <div className={classes.error_msg}>{errormessage}</div>}
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  Sign Up
                </Button>
                <Grid item>
                  <Button onClick={switchMode} variant="text" color="primary">
                    Already have an account? Sign In
                  </Button>
                </Grid>
              </>
            )
          }
            {
              !isSignup && !isForgotPassword && (
                <>
                  <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                  {error.email && <span className="error-message">{error.email}</span>}
                  <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                  {errormessage && <div className={classes.error_msg}>{errormessage}</div>}
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Sign In
                  </Button>
                  <GoogleLogin
                    clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                        Google Sign In
                      </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                  />
                  <Grid container>
                    <Grid item xs>
                      <Button onClick={() => setIsForgotPassword(true)} variant="text" color="primary">
                        Forgot password?
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button onClick={switchMode} variant="text" color="primary">
                        Don t have an account? Sign Up
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )
            }
            {
              !isSignup && isForgotPassword && (
                <>
                  <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                  {error.email && <span className="error-message">{error.email}</span>}
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Reset Password
                  </Button>
                  <Button onClick={() => setIsForgotPassword(false)} fullWidth variant="text" color="primary">
                    Cancel
                  </Button>
                </>
              )
            }
          </form>
        </Paper>
      </Container>
    </section>
  );
};

export default SignUp;
