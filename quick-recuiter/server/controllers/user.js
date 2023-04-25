import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import UserModal from "../models/user.js";
import express from "express";
import crypto from 'crypto';
import auth from '../middleware/auth.js';


const secret = "test";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gharbi.wided@esprit.tn",
    pass: "cdrzdbqyiwomudjj",
  },
});
const router = express.Router();

export const resetpassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Find the user with the specified reset password token
    const user = await UserModal.findOne({ resetPasswordToken: token });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // Check if the reset password token has expired
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: "Token expired" });
    }

    // Hash the new password and update the user's password in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;

    // Reset the reset password token and expiry date for the user
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    // Return a success message to the client
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await UserModal.findOne({ email });
  try {
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

      if(!oldUser.verified)
      {
        const verificationToken = crypto.randomBytes(20).toString('hex');
        await UserModal.findByIdAndUpdate(oldUser._id, {
          $set: {
            verificationToken: verificationToken,
          },
        });
        const mailOptions1 = {
          from: process.env.EMAIL_USERNAME,
          to: email,
          subject: 'Confirm your email address',
          html: `
            <div style="background-color: #F5F5F5; padding: 20px;">
              <h2 style="font-size: 24px; color: #333; margin-bottom: 20px;">Thanks for signing up for our app</h2>
              <p style="font-size: 16px; color: #333;">Please click <a href="http://localhost:3000/confirm/${verificationToken}" style="text-decoration: none; color: #007bff;">here</a> to confirm your email address and Sign in.</p>
              <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 14px; color: #666; margin-top: 20px;">Thanks,</p>
              <p style="font-size: 14px; color: #666;">The App Team</p>
            </div>
          `
        };
       await transporter.sendMail(mailOptions1);
      
        //return res.status(400).json({ message: "Please verify your email" });
      }

      if (oldUser && isPasswordCorrect && oldUser.verified){
    let twofactorcode = Math.floor(1000 + Math.random() * 90000);
    await UserModal.findByIdAndUpdate(oldUser._id, {
      $set: {
        otpCode: twofactorcode,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "RealTime OTP",
      html: `Here your RealTime OTP code: ${twofactorcode}`,
    };
    await transporter.sendMail(mailOptions);
  }

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { role, email, password, firstName, lastName, tel, location, gender } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const result = await UserModal.create({
      role,
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      verificationToken,
      tel,
      location,
      gender
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Confirm your email address',
      html: `
            <div style="background-color: #F5F5F5; padding: 20px;">
              <h2 style="font-size: 24px; color: #333; margin-bottom: 20px;">Thanks for signing up for our app</h2>
              <p style="font-size: 16px; color: #333;">Please click <a href="http://localhost:3000/confirm/${verificationToken}" style="text-decoration: none; color: #007bff;">here</a> to confirm your email address and Sign in.</p>
              <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 14px; color: #666; margin-top: 20px;">Thanks,</p>
              <p style="font-size: 14px; color: #666;">The App Team</p>
            </div>
          `
    };

//    res.status(201).json({ result, token });
    transporter.sendMail(mailOptions);
    return res.status(400).json({ message: "Please check your mail and confirm your account" });
      
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const confirmEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await UserModal.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: 'Invalid token' });
    }

    user.verificationToken = '';
    user.verified = true;

    await user.save();

    res.status(200).json({ message: 'Email address confirmed' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user with the specified email address
    const user = await UserModal.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    // Generate a new password reset token
    const token = Math.random().toString(36).substr(2);

    // Set the password reset token and expiry date for the user
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

    // Save the updated user details to the database
    await user.save();

    // Create an email message containing the password reset link
    const resetUrl = `http://localhost:3000/forgotPassword/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Password Reset Request",
      html: `Please click <a href="${resetUrl}">here</a> to reset your password.`,
    };

    // Send the email to the user
    await transporter.sendMail(mailOptions);

    // Return a success message to the client
    return res
      .status(200)
      .json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signInWithGoogle = async (req, res) => {
  const { email, familyName, givenName } = req.body;
  try {
    let oldUser = await UserModal.findOne({ email });

    if (!oldUser) {
      const hashedPassword = await bcrypt.hash(email, 12);
      oldUser = await UserModal.create({
        email,
        password: hashedPassword,
        name: `${givenName} ${familyName}`,
        verified: true,
      });
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//crud user
export const addUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(Number("hey"));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let userToAdd = { ...req.body, password: hashPassword, verified: false, role: "Condidate", name: `${req.body.firstName} ${req.body.lastName}` }
    delete userToAdd.firstName;
    delete userToAdd.lastName;

    let user = await new UserModal(userToAdd).save();
    res.status(201).json(user);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
export const listUser = async (req, res) => {
  try {
    const users = await UserModal.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

export const unverifyUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await UserModal.findByIdAndUpdate(userId, { verified: false });
    res.status(200).send({ message: "User verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}
export const verifyUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await UserModal.findByIdAndUpdate(userId, { verified: true });
    res.status(200).send({ message: "User verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await UserModal.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export const updateUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(Number("hey"));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let userToUpdate = { ...req.body, password: hashPassword, verified: false, role: "user", name: `${req.body.firstName} ${req.body.lastName}` }
    delete userToUpdate.firstName;
    delete userToUpdate.lastName;

    const updateduser = await UserModal.updateOne({ _id: req.params.id }, { $set: userToUpdate });
    res.status(200).json(updateduser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

}


 // changer Password 
  export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
  
    try {
      // Verify user's authentication using auth middleware
      const token = req.headers.authorization.split(" ")[1];
      const decodedData = jwt.verify(token, secret);
      const userId = decodedData.id;
  
      // Find user by ID and check if old password matches
      //console.log("user ID:", userId);
      const user = await UserModal.findById(userId);
      const isMatch = await bcrypt.compare(oldPassword, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid old password' });
      }else
      {
            // Hash new password and update user's password in the database
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(newPassword, salt);
         const updatedPassword =await UserModal.findByIdAndUpdate(userId, { password: hashedPassword });
         res.status(200).json(updatedPassword);
                   }
        } catch (error) {
         res.status(500).json({ message: 'Server error' });
    }
  };
  
// Route middleware to verify token
router.use('/', auth, (req, res, next) => {
  next();
});

//update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, secret);
    const userId = decodedData.id;

    // Find user by ID and check if old password matches
    console.log("user ID:", userId);
    
    const { name, email, location, tel, gender } = req.body;
    const updatedUser = await UserModal.findByIdAndUpdate(userId, {
      ... req.bady,
      name,
      email,
      location,
      gender,
      tel,
    }, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const paginatedUsers = async (req, res) => {
  try {
    const users = await UserModal.find({});
    const currentPage = parseInt(req.query.currentPage);
    const limit = parseInt(req.query.limit);

    const startIndex = (currentPage - 1) * limit;
    const lastIndex = currentPage * limit;

    const results = {};
    results.totalUser = users.length;
    results.pageCount = Math.ceil(users.length / limit); // divide by limit

    if (lastIndex < users.length) {
      results.next = {
        currentPage: currentPage + 1,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        currentPage: currentPage - 1,
      };
    }
    results.result = users.slice(startIndex, lastIndex);
    res.status(200).json(results);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};



export const search = async (req, res) => {
	
		let result = await UserModal.find({
			"$or": [
				{name: {$regex: req.params.key}},
				{email: {$regex: req.params.key}},
			],
		});

		res.send(result);
	 
};



