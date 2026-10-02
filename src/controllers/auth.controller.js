const userModel = require("../models/user.model");
const emailService = require("../services/email.service");
const jwt = require("jsonwebtoken");

/**
 * - user registration
 * - api endpoint: POST /api/auth/register
 */
async function registerUser(req, res) {
  const { name, email, password } = req.body;

  const isExist = await userModel.findOne({ email });
  if (isExist) {
    return res
      .status(422)
      .json({ message: "User already exists", status: "failed" });
  }

  const user = new userModel({ name, email, password });
  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });

  // Send registration email
  try {
    await emailService.sendRegisterationEmail(user.email, user.name);
    console.log("Registration email sent successfully");
  } catch (error) {
    console.error("Error sending registration email:", error);
  }
}

/**
 * - user login
 * - api endpoint: POST /api/auth/login
 */
async function loginUser(req, res) {
  const { email, password } = req.body;
  console.log(req.body);

  const user = await userModel.findOne({ email }).select("+password"); // select password field explicitly

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
}

module.exports = { registerUser, loginUser };
