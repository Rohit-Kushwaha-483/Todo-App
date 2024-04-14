import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res
      .status(404)
      .json({ sucess: false, message: "Invalid Email or Password" });
  }

  // isMatched returns either true or false
  const isMatched = await bcrypt.compare(password, user.password);

  // user entered the correct email but incorrect password
  if (!isMatched) {
    return res
      .status(404)
      .json({ sucess: false, message: "Invalid Email or Password" });
  }

  // use entered all details correctly
  if (isMatched) {
    sendCookie(user, res, `Welcome , ${user.name}`, 200);
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res
      .status(400)
      .json({ sucess: false, message: "User already exists" });
  } else {
    /*bcrypt.hash(): This function is used to generate a hash of a plaintext password. It takes the plaintext password and a salt factor (optional) as input parameters and returns the hashed password asynchronously.
    
    bcrypt.compare(): This function is used to compare a plaintext password with its hashed counterpart. It takes the plaintext password and the hashed password as input parameters and returns a boolean value indicating whether the passwords match.*/

    const hashedPassword = await bcrypt.hash(password, 10);
    // for password field key - value pair is not same,that's why use password: hashedPassword instead
    const user = await User.create({ name, email, password: hashedPassword });
    sendCookie(user, res, "Registered Succesfully", 201);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    sucess: true,
    message: "Found User",
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "You have been Logout !",
    });

  //   // Better way

  // res.clearCookie("token").status(200).json({
  //   success: true,
  //   message: "You have been logged out!",
  // });
};
