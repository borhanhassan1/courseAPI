const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    return res.status(401).json("token is required");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(
      token,
      "7e016be4f6ab5c929cc0623fa4a8576a7ac34576d724249b5246277308610709"
    );
    req.currentUser = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json("invalid token");
  }
};
module.exports = verifyToken;
