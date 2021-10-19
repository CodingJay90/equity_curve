import { generateToken } from "../utils/auth.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import User from "../model/User.js";
import _ from "lodash";

export async function registerUser(req, res) {
  const { email, username, avatar, password, first_name, last_name } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt
    .hash(password, salt)
    .catch((err) => console.log(err));

  try {
    //throw error if error exist
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const newUser = await User.create({
      email,
      avatar,
      username,
      first_name,
      last_name,
      password: hashedPassword,
    });

    const token = await generateToken(newUser);
    res.header("Authorization", token);
    res.status(200).json({ success: true, user: newUser, token });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false, message: err });
  }
}

export async function loginUser(req, res) {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      console.log("User not found");
      return res.json({
        success: false,
        message: "A user with the given email do not exist",
      });
    }
    const validatePassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!validatePassword) {
      return res.json({
        success: false,
        message: "Invalid Credentials. Password does not match",
      });
    }
    const token = await generateToken(foundUser);
    // var sanitizedUser = _.omit(foundUser.toObject(), "password");
    res.status(200).json({ success: true, token, user: foundUser });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
}
