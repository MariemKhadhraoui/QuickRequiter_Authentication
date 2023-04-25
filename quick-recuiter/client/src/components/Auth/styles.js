import { colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(-8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  expiration: {
    height: "35px",
    width: "50px",
    paddingLeft: "7px",
    border: "5px solid red",
    color: "red",
    borderRadius: "50%",
    display: "inline-block"
  },
  expired:{
    color: "red !important"
  },
  form_container: {
    display: "flex",
    gap:"20px",
    alignItems: "flex-start",
  },
  input: {
    outline: "none",
    border: "none",
    width: "10px",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#edf5f3",
    margin: "5px 0",
  },
  green_btn: {
    border: "none",
    outline: "none",
    padding: "12px 0",
    backgroundColor: "indigo",
    borderRadius: "20px",
    width: "120px",
    fontWeight: "bold",
    color: "white",
    margin: "10px 20px 0 20px",
    fontSize: "14px",
    cursor: "pointer",
  },
  success_msg: {
    width: "370px",
    padding: "15px",
    margin: "5px 0",
    fontSize: "14px",
    backgroundColor: "#5cdd5c",
    color: "white",
    borderRadius: "5px",
    textAlign: "center",
  },
  error_msg: {
    width: "370px",
    padding: "15px",
    margin: "5px 0",
    fontSize: "14px",
    backgroundColor: "#f34646",
    color: "white",
    borderRadius: "5px",
    textAlign: "center",
  }
  
}));
