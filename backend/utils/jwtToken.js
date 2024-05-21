export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  // token ke ander options hote h...
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,

    // if you are use https on fronted url
    // use this
    // 😎😎😎
    // secure:true
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
