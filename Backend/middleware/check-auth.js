const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication faild!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY); // Validating the token
    req.userData = { userId: decodedToken.userId };
    next(); // let the request continue
  } catch (err) {
    const error = new HttpError("Authentication faild!", 403);
    return next(error);
  }
};
