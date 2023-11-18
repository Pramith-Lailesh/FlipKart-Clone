const User = require("../model/userSchema");

const userSignUp = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, phone } = req.body;
    const existUser = await User.findOne({ username: username });

    if (existUser) {
      return res.status(401).json({ message: "username already exist" });
    }

    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
      phone: phone,
    });
    res.status(201).json({
      message: "user created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to create user",
      error: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await User.findOne({
      username: username,
      password: password,
    });
    if (!existUser) {
      return res.status(400).json({
        message: "user need to signUp",
      });
    } else {
      return res.status(200).json({ data: existUser });
    }
  } catch (error) {
    res.status(500).json({
      message: "failed to get user",
      error: error.message,
    });
  }
};
module.exports = { userSignUp, userLogin };
