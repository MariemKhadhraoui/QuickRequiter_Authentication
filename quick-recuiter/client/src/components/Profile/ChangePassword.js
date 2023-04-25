import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../actions/userActions";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import * as actionType from "../../constants/actionTypes";

import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  TextField,
  FormControl,
  IconButton,
  Paper,
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    left: "10%",
    marginTop: theme.spacing(0.5),
  },
  form: {
    width: "80%",
    marginTop: theme.spacing(0.5),
    alignContent: "center",
  },
  paper: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    margin: 0,
    position: "absolute",
    left: "10%",
    marginTop: theme.spacing(8),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  success: {
    marginBottom: theme.spacing(2),
  },
  error: {
    marginBottom: theme.spacing(2),
  },
}));

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (oldPassword === newPassword) {
      setPasswordError("New password must be different from your old password");
      return;
    } else if (newPassword !== confirmNewPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else if (
      newPassword.length < 6 ||
      !/[!@#$%^&*(),.?":{}|<>]/g.test(newPassword)
    ) {
      setPasswordError(
        "Password must be at least 6 characters long and contain a special character"
      );
      return;
    }

    setPasswordError("");

    try {
        const response = await dispatch(changePassword(oldPassword, newPassword));
       alert(JSON.stringify(response))
        setSuccessMessage("Password successfully changed");
        setIsPasswordChanged(true);
      // Redirect to home page after 3 seconds
        setTimeout(() => {
        dispatch({ type: actionType.LOGOUT });
        setUser(null);
        history.push("/");
        }, 3000);
    } catch (error) {
      setErrorMessage(
        error.response.data.message ||
          "Unable to change password, please try again"
      );
      setSuccessMessage("");
    }

    
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <h2> Change Password</h2>
  
      <form onSubmit={handleSubmit} className={classes.form}>
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="oldPassword"
            label="Old Password"
            type={showOldPassword ? "text" : "password"}
            id="old-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            disabled={isPasswordChanged}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowOldPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showOldPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type={showPassword ? "text" : "password"}
            disabled={isPasswordChanged}
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmNewPassword"
           
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirm-new-password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            disabled={isPasswordChanged}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
         
          />
   
        </FormControl>
        <br></br> <br></br>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isPasswordChanged}
          >
            Confirm
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>{" "}
        <br></br> <br></br>
      </form>
      <div>
        {passwordError && (
          <Alert severity="error" className={classes.error}>
            {passwordError}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" className={classes.success}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" className={classes.error}>
            {errorMessage}
          </Alert>
        )}
        </div>
    </Paper>
  );
};
export default ChangePassword;
