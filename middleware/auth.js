const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

module.exports.authCheck = async (req, res, next) => {
  try {
    console.log("My Token==>", req.headers.authorization);
    let token;
    if (req.headers.authorization) token = req.headers.authorization;
    const payload = jwt.verify(token, "thisisnotagoodsecret");
    req.userId = payload.id;
    next();
  } catch (error) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
