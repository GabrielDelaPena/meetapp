const User = require("../models/User"); 
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("USERS FETCHED");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};

exports.register = async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).send("Email already exist.");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const user = new User({
    role: "User",
    username: req.body.username,
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email,
    phone: req.body.phone, 
    friends: []
  });

  try {
    const savedUser = await user.save();
    console.log("USER CREATED");
    res
      .status(200)
      .send(`User ${savedUser.username} has been successfully registered.`);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send("Username does not exist.");
  }

  const isEqual = await bcrypt.compare(req.body.password, user.password);
  if (!isEqual) {
    return res.status(400).send("Username or Password invalid.");
  }

  try {
    console.log("USER LOGGEDIN");
    res.status(200).send(user._id);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};
