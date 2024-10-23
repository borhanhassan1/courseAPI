const jwt = require("jsonwebtoken");

module.exports = async (payload) => {
  const token = jwt.sign(
    payload,
    "7e016be4f6ab5c929cc0623fa4a8576a7ac34576d724249b5246277308610709",
    { expiresIn: "1h" }
  );
  return token;
};
