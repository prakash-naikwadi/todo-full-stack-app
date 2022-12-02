const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.getUser = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const user = await User.findById(userId).populate("todos");

    user.password = "";

    res.status(201).json({
      success: true,
      message: "Records Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new Error("Something went wrong");
      throw error;
    }

    if (existingUser) {
      const error = new Error("User Existed.");
      throw error;
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      const error = new Error("Could not create user, please try again.");
      throw error;
    }

    const createdUser = new User({
      name,
      email,
      password: hashedPassword,
      todos: [],
    });

    try {
      await createdUser.save();
    } catch (err) {
      const error = new Error("Signing up failed, please try again later.");
      throw error;
    }

    createdUser.password = "";

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      createdUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let existingUser;

    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new Error("Logging in failed, please try again later.");
      throw error;
    }

    if (!existingUser) {
      const error = new Error("Invalid credentials, could not log you in.");
      throw error;
    }

    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      const error = new Error(
        "Could not log you in, please check your credentials and try again."
      );
      throw error;
    }

    if (!isValidPassword) {
      const error = new Error("Invalid credentials, could not log you in.");
      throw error;
    }

    let token;
    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        "supersecret_dont_share",
        { expiresIn: "1h" }
      );
    } catch (err) {
      const error = new Error("Logging in failed, please try again later.");
      throw error;
    }

    res.status(201).json({
      success: true,
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
      name: existingUser.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
