const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { username, password, fullName } = req.body;
    const searchUsers = await Users.findAll({ where: { username: username } });
    if (searchUsers.length > 0) {
      return res.status(409).json({
        message: "user with username alresdy exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await Users.create({
      fullName: fullName,
      username: username,
      password: hashedPassword,
    });
    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } });
    if (!user) return res.status(404).json({ message: "user not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect Password" });
    const accessToken = sign(
      { username: user.username, id: user.id },
      "KEYKEYKEY"
    );
    return res
      .status(200)
      .json({ accessToken: accessToken, username: username, id: user.id });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const auth = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const userDetails = await Users.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json(error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findByPk(req.user.id);
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect Password" });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Users.update(
      { password: hashedPassword },
      { where: { id: req.user.id } }
    );
    return res.status(200).json({ message: "password updated successfully" });
  } catch (error) {}
};
module.exports = { register, login, auth, getUserById, changePassword };
