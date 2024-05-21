import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

// catchAsyncError use beacuse we cannot write the try and catch .......
// register
export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;

  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("Please fill the registran form! "));
  }

  // phele se email mil gai toh.....
  const isEmail = await User.findOne({ email });

  if (isEmail) {
    return next(new ErrorHandler("Email already exisits"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });

  // resgister kiya ya login kiya toh user ko direct login ho jana chahiye...
  sendToken(user, 200, res, "User Registered Successfully!");
});

// login

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(
      new ErrorHandler("Please provide email and password and role.", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  // comparePassword ko userSchema mai banaye tha...na
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  if (user.role !== role) {
    return next(new ErrorHandler("User with this role not found!", 400));
  }
  sendToken(user, 200, res, "User logged in successfully!");
});

// logout
// localStorage se cookie ko delete karwana chahete h...

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User logged out successfully!",
    });
});

// token naam h or uss ko empty kar na h ""

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
