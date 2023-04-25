/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import * as api from '../../api/index.js';
import useStyles from './styles';

const TwoFactorAuth = () => {
  const [otpCode, setOtpCode] = useState(["", "", "", "", ""]);
  const [msg, setMsg] = useState("");
  const location = useLocation();
  const {state} = location.state;
  const history = useHistory();
  useEffect(() => {
    if (!state) {
      history.push("/auth");
    }
  }, [state]);
  const [error, setError] = useState("");
  const [expiresIn, setExpiresIn] = useState(30);

  const classes = useStyles();
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (expiresIn > 0) {
        setExpiresIn((expiresIn) => expiresIn - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiresIn]);
  const handleChangeCode = (e) => {
    const { value, name } = e.target;
    if (value.length > 1) {
      return;
    }
    setOtpCode((prevOtpCode) => {
      const otpCodeArray = [...prevOtpCode];
      otpCodeArray[name] = value;
      return otpCodeArray;
    });
  };

  const handleReset = async () => {
    setOtpCode(["", "", "", "", ""]);
    try {
      const { data } = await api.generateTwoFactor(state)
      setMsg(data.message);
      setExpiresIn(30);
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data);
        setError(error.response.data);
        setMsg("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // (email, otpCode, expiresIn)
      const { data } = await api.validateTwoFactor(
        state,
        otpCode.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        ),
        expiresIn,
      );
      setMsg(data.message);
      localStorage.setItem("otp-verification", true);
      history.push("/");
      setError("");
    } catch (error) {
      localStorage.setItem("otp-verification", false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data);
        setError(error.response.data);
        setMsg("");
      }
    }
  };
  return (
    <section className='hero1'>
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
      <h1>OTP RealTime Code</h1>
      <form className={classes.form_container} onSubmit={handleSubmit}>
            <input
              type="text"
              name="0"
              onChange={handleChangeCode}
              value={otpCode[0]}
              required
              className={classes.input}
            />
            <input
              type="text"
              name="1"
              onChange={handleChangeCode}
              value={otpCode[1]}
              required
              className={classes.input}
            />
            <input
              type="text"
              name="2"
              onChange={handleChangeCode}
              value={otpCode[2]}
              required
              className={classes.input}
            />
            <input
              type="text"
              name="3"
              onChange={handleChangeCode}
              value={otpCode[3]}
              required
              className={classes.input}
            />
            <input
              type="text"
              name="4"
              onChange={handleChangeCode}
              value={otpCode[4]}
              required
              className={classes.input}
            />
          </form>
          
          {error && <div className={classes.error_msg}>{error}</div>}
          {msg && <div className={classes.success_msg}>{msg}</div>}
          <div>
            <button
              type="Reset"
              onClick={handleReset}
              className={classes.green_btn}
            >
              Re-send OTP
            </button>
            <button
              type="Submit"
              onClick={handleSubmit}
              className={classes.green_btn}
            >
              validate
            </button>
          </div>
          <br></br>
          {expiresIn === 0 ? (
            <h5 className={classes.expired}>your code has been expired</h5>
          ) : (
            <h4>
              expires In: <div className={classes.expiration}>{expiresIn}</div>
            </h4>
          )}
      </Paper>
    </Container>
    </section>
  );
};
export default TwoFactorAuth;
