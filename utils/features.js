import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  // Sending the response / cookie after creating the user in the database
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({ success: true, message });
};
