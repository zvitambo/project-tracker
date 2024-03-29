const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) throw new BadRequestError("email already in use");
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({
      user: {
        name: user.name,
        email: user.email,
        location: user.location,
        lastName: user.lastName,
        role: user.role,
      },
      token,
      location: user.location,
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new UnauthenticatedError("Invalid credentials");

  if (!user.isActive) {
    throw new BadRequestError(
      "Account requires activation, please contact the administrator ..."
    );
  }

  const isCorrectPassword = await user.comparePassword(password);

  if (!isCorrectPassword) throw new UnauthenticatedError("Invalid credentials");

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      location: user.location,
      lastName: user.lastName,
      role: user.role,
      _id: user._id,
    },
    token,
    location: user.location,
  });
};

const updateUser = async (req, res) => {
  const { name, email, lastName, location } = req.body;
  if (!name || !email || !lastName || !location) {
    throw new BadRequestError("please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  if (!user) throw new NotFoundError("User not found");

  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.location = location;
  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

const activateUserAccount = async (req, res) => {
  const { name, email, lastName, location } = req.body;
  if (!email) {
    throw new BadRequestError("please provide valid input");
  }

  const user = await User.findOne({ email: email });
  if (!user) throw new NotFoundError("User not found");

  user.isActive = !user.isActive;
  await user.save();
  
  res.status(StatusCodes.OK).json({
    user,
  });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  if (!users) throw new NotFoundError("Users not found");
  res.status(StatusCodes.OK).json({ users });
};

module.exports = {
  register,
  login,
  updateUser,
  getAllUsers,
  activateUserAccount,
};
