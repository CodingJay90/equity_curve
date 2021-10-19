import express from "express";
import { loginUser, registerUser } from "../controllers/user-controller.js";
import { body, validationResult, check } from "express-validator";
import User from "../model/User.js";

const router = express.Router();

router.post(
  "/user/create",
  [
    check("password")
      .isLength({ min: 5 })
      .withMessage("password must be at least 5 chars long"),
    check("username").notEmpty().withMessage("Username field cannot be empty"),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid Email")
      .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
              reject(new Error("Server Error"));
            }
            if (Boolean(user)) {
              reject(new Error("E-mail already in use"));
            }
            resolve(true);
          });
        });
      }),
  ],
  registerUser
);
router.post("/user/login", loginUser);

export default router;
