import { React, useEffect } from 'react';
import axios from 'axios';
import Auth from "./Auth"
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { Container, Paper } from '@material-ui/core';

const ConfirmEmail = ({ match }) => {
  const { token } = match.params;
  const errormessage = useSelector((state) => state.auth.error);
  const classes = useStyles();

  const confirmEmail = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/confirm/${token}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    confirmEmail();
  }, []);

  return (
    <section>
      {errormessage && (
        <Container className={classes.container}>
          <Paper elevation={3} className={classes.paper}>
            <h2>{errormessage}</h2>
          </Paper>
        </Container>
      )}

      {!errormessage && (
        <Auth />
      )}
    </section>
  );
};

export default ConfirmEmail;
