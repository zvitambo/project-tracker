const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {BadRequestError, UnauthenticatedError, NotFoundError} = require('../errors')



const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const userAlreadyExists = await User.findOne({email});
  if (userAlreadyExists) throw new BadRequestError("email already in use");
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: {name: user.name, email: user.email, location: user.location, lastName: user.lastName}, token, location: user.location});
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const user = await User.findOne({ email }).select('+password');
  
  if (!user) throw new UnauthenticatedError("Invalid credentials");
  
  const isCorrectPassword = await user.comparePassword(password);
  
  if (!isCorrectPassword) throw new UnauthenticatedError("Invalid credentials");
  
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({
      user: {
        name: user.name,
        email: user.email,
        location: user.location,
        lastName: user.lastName,
      },
      token,
      location: user.location,
    });
};

const updateUser = async (req, res) => {
  const { name, email, lastName, location } = req.body;
  if ((!name || !email || !lastName || !location)) {
    throw new BadRequestError("please provide all values");
  }

  const user = await User.findOne({_id: req.user.userId});
  if (!user) throw new NotFoundError('User not found');
  
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


}





module.exports = { register, login, updateUser };
