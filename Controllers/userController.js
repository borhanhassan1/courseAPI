const users = require("../models/Users");
const generateJWT = require("../utils/generateJWT");
const status = require("../utils/statusMessage");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  const allUsers = await users.find({}, { __v: 0 });
  res.status(200).json({ status: status.SUCCESS, data: { allUsers } });
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const user = new users({
      firstName,
      lastName,
      email,
      password: hashedPass,
      role,
    });
    user.token = await generateJWT({ email, id: user._id, role });
    await user.save();
    res.status(201).json({ status: status.SUCCESS, data: user.token });
  } catch (err) {
    res.status(400).json({ status: status.ERROR, data: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const findEmail = await users.findOne({ email });
  if (findEmail) {
    const verifyPass = await bcrypt.compare(password, findEmail.password);
    if (verifyPass) {
      const token = await generateJWT({
        email,
        id: findEmail._id,
        role: findEmail.role,
      });
      res.status(200).json({ status: status.SUCCESS, data: { token } });
    } else {
      res
        .status(401)
        .json({ status: status.FAIL, data: { msg: "pass not correct" } });
    }
  } else {
    res
      .status(404)
      .json({ status: status.FAIL, data: { msg: "user not found!" } });
  }
};

module.exports = {
  getUsers,
  register,
  login,
};
