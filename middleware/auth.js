const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-authToken");
  !token && res.status(401).send("Access denied, no token provided");
  const user = jwt.verify(req.header("x-authToken"), "jwt-privateKey");
  !user ? res.status(401).send("Invalid Token!") : (req.userId = user);
  next();
};

module.exports = auth;
