import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String,},
  email: { type: String,  },
  password: { type: String, },
  id: { type: String },
	verified: { type: Boolean, default: false }, 
  otpCode: {type:Number, default: 0},
  role: { type: String, default: "Condidate" },
  verificationToken: {type: String, default:''},
  verificationTokenExpiry: {type: String},
  location: { type: String },

  videoLink: { type: String },

  
  tel: {
    type: String,
    minlength: 8,
    maxlength: 12
  },
  gender: {type: String, default: "Male"},
 
});

export default mongoose.model("User", userSchema);