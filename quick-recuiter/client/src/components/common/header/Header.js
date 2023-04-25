import Head from "./Head";
import "./header.css";
import React, { useState, useEffect } from "react";
import { Typography, Avatar, Menu, MenuItem, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import * as actionType from "../../../constants/actionTypes";
import useStyles from "./styles.js";

const Header = () => {
  const [click, setClick] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB "}
            onClick={() => setClick(false)}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/jobs">All Jobs</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          <div className="start">
            {user?.result ? (
              <div className={classes.profile}>
                <Avatar
                  className={classes.purple}
                  alt={user?.result.name}
                  src={user?.result.imageUrl}
                >
                  {user?.result.name.charAt(0)}
                </Avatar>

                <Typography className={classes.userName} variant="h6">
                  {user?.result.name}
                </Typography>

                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  My Profile
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleClose}
                  >
                    Edit my Profile
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/changepassword"
                    onClick={handleClose}
                  >
                    Change Password
                  </MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <li>
                <Link to="/auth">Sign in</Link>
              </li>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
