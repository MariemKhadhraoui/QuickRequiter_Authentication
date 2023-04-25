import express from "express";
import auth from '../middleware/auth.js';

const router = express.Router();

import { confirmEmail, updateUserProfile,changePassword,addUser, deleteUser, forgotPassword, listUser, signin, signInWithGoogle, signup, unverifyUser, updateUser, verifyUser } from "../controllers/user.js";
import {paginatedUsers, search } from "../controllers/user.js";
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);
router.post("/signinWithGoogle", signInWithGoogle);
router.get("/confirm/:token", confirmEmail);
router.post('/changePassword', auth, changePassword);



router.post('/updatProfile', auth, updateUserProfile);


//crud user
router.post("/addUser", addUser);
router.get("/unverifyUser/:userId", unverifyUser);
router.get("/verifyUser/:userId", verifyUser);
router.delete("/deleteUser/:id", deleteUser);
router.get("/listUser", listUser);    
router.put("/updateUser/:id", updateUser);
router.get("/paginatedUsers", paginatedUsers);
router.get("/search/:key", search);
export default router;