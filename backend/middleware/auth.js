const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    console.log("AUTH HEADER:", token);
    console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

    if (!token) {
      return res.status(401).json({
        message: "Access Denied",
      });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    console.log("VERIFIED USER:", verified);

    req.user = verified;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid Token",
      error: error.message,
    });
  }
};
