import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAuthorized = catchAsyncErrors(async (req, res, next) => {
  // yeh token ko humne use nhi kya h . iss ko hum ne utils ke ander file banai h jwtToken wali....

  const { token } = req.cookies;

  // agar user login hi nhi h toh....
  if (!token) {
    return next(new ErrorHandler("User not authorized", 400));
  }

  // hacker ya 3rd party user (any toke daale te h toh....) Token verification......
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);
  next();
});
