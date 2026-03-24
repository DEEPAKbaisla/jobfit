import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blacklist.model.js";

/**
 * @namee registerUserController
 * @description register a new user,expert username ,email and password in the request
 * @access Public
 */

async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username,email and password",
    });
  }
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists) {
    if (isUserAlreadyExists.username == username) {
      return res.status(400).json({
        message: "user name already exists",
      });
    }
    return res.status(400).json({
      message: "Account already exists with this email address or username",
    });
  }
  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  //   console.log(process.env.JWT_SECRET)
  // res.cookie("token",token)
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @namee loginUserController
 * @description login a  user,expert username ,email and password in the request
 * @access Public
 */

async function loginUserController(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  // res.cookie("token",token)
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(201).json({
    message: "User login successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @namee logoutUserController
 * @description clear token from user cookie and add token in blacklist
 * @access Public
 */

async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if (token) {
    await tokenBlacklistModel.create({ token });
  }
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}
/**
 * @namee getMEController
 * @description get the current logged in user deatils
 * @access Private
 */

async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export default {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
