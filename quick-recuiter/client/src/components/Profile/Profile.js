import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../actions/userActions";
import * as actionType from "../../constants/actionTypes";
import FileBase from 'react-file-base64';



import { Alert } from "@material-ui/lab";

import {
  Button,
  TextField,
  FormControl,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormLabel,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const Profile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");

  const [tel, setTel] = useState([]);
  const [gender, setGender] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userData);

  const [userInfo, setuserInfo] = useState(
    JSON.parse(localStorage.getItem("profile")).result
  );
  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);

  const [telValues, setTelValues] = useState(userInfo.tel);

  const handleTelChange = (e, index) => {
    const newTelValues = [...telValues];
    newTelValues[index] = e.target.value;
    setTelValues(newTelValues);
  };

  const handleAddTel = () => {
    setTelValues([...telValues, ""]);
  };

  const handleDeleteTel = (index) => {
    const newTelValues = [
      ...telValues.slice(0, index),
      ...telValues.slice(index + 1),
    ];
    setTelValues(newTelValues);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);

      setPassword(userInfo.password);

      setLocation(userInfo.location);
      setTel(userInfo.tel);
      setGender(userInfo.gender);
    }
  }, [history, userInfo]);

  const useStyles = makeStyles((theme) => ({
    form: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "600px",
      margin: "auto",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    textField: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateUserProfile({
          name,
          email,
          location,
          tel,
          gender,
        })
      );
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      setuserInfo(JSON.parse(localStorage.getItem("profile")).result);
    } catch (error) {
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }
  };

  const classes = useStyles();
  const handleCancel = () => {
    history.push("/");
  };

  const handleImageUpload = (image) => {
    setImageUrl(image.base64);
  };

  return (
    <div>
      <br></br>
      <h2>Edit Profile</h2>

      <form className={classes.form} onSubmit={submitHandler}>
        <FormControl className={classes.formControl}>
          <TextField
            id="name"
            label="Name"
            required
            value={name}
            className={classes.textField}
            onChange={(e) => setName(e.target.value)}
            disabled={showSuccessAlert}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="email"
            label="Email"
            type="email"
            required
            value={email}
            className={classes.textField}
            onChange={(e) => setEmail(e.target.value)}
            disabled={showSuccessAlert}
          />
        </FormControl>
        <br></br>
        <FormControl>
          <TextField
            id="location"
            label="Location"
            placeholder="Tell us about your Location"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={showSuccessAlert}
          />
        </FormControl>
        <br></br>
        <FormControl>
          <TextField
            id="tel"
            label="Telephone"
            required
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            disabled={showSuccessAlert}
          />
        </FormControl>
        <br></br>
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Female"
              control={<Radio disabled={showSuccessAlert} />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>

        <br></br>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={showSuccessAlert}
        >
          Update
        </Button>{" "}
        <br></br>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </form>

      {showSuccessAlert && (
        <Alert severity="success">Profile updated successfully!</Alert>
      )}
      {showErrorAlert && (
        <Alert severity="error">
          Error updating profile. Please try again.
        </Alert>
      )}
    </div>
  );
};

export default Profile;
