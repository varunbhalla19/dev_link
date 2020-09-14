const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const middleware = (req, res, next) => {
  console.log("inside auth middleware");
  const token = req.get("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization denied!" });
  }

  jwt.verify(token, JWT_SECRET, (er, decoded) => {
    if (er) {
      return res.status(401).json({
        errors: [
          {
            msg: er.message,
            customMsg: "Invalid Token, Verification failed",
          },
        ],
      });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = middleware;
