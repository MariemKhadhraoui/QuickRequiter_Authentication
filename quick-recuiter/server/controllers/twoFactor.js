import UserModal from "../models/user.js";
import nodemailer from 'nodemailer';
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gharbi.wided@esprit.tn',
    pass: 'cdrzdbqyiwomudjj'
  }
  });
export const generateTwoFactor = async (req, res) => {
  try {
    const { email } = req.body;
    let twofactorcode = Math.floor(1000 + Math.random() * 90000);
    const user = await UserModal.findOne({email});
    await UserModal.findByIdAndUpdate(user._id, {
      $set: {
        otpCode: twofactorcode,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "two factor verification",
      html: "your otp code is: " + twofactorcode,
    };

    // Send the email to the user
    await transporter.sendMail(mailOptions);
 
    res.status(200).json({ message: "OTP Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const validateTwoFactor = async (req, res) => {
  try {
    const { expiresIn, otpCode, email } = req.body;
    if (expiresIn === 0) throw new Error("OTP Expired");
    const user = await UserModal.findOne({ email });
    if (parseInt(otpCode) !== user.otpCode) throw new Error("Invalid OTP");
    await UserModal.findOneAndUpdate({ email }, { otpCode: null });
    res.status(200).json({ message: "OTP Verified" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};