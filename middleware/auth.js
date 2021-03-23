const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = jwt.sign({ id: req.body._id }, "privatekey");
  !token ? res.status(401).send("Invalid token") : next();
};
