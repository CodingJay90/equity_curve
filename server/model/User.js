import mongoose from "mongoose";
// import { isEmail } from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    curr_plan: {
      type: String,
    },
    plans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plans",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
