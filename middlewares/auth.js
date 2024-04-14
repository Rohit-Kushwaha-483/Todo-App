import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  // Case -1 : Token not Found which means that user is not Logged In
  if (!token) {
    return res
      .status(404)
      .json({ sucess: false, message: "Login First and then try" });
  }

  // Case - 2 : Token found (User is Logged In),  so verify it
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  const id = decodedData._id;
  // finding the user by its ID
  req.user = await User.findById(id);
  next();
};
