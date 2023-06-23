import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js";
import config from "../config/index.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: [true, "Name should not exceed 50 chars"],
    },
    avatar: {
      publilc_id: String,
      url: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must have at least 6 characters"],
      select: false,
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(AuthRoles),
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true }
);

//encrypt password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//add more features directly to your schema
userSchema.methods = {
  //compare password
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  //generate JWT Token
  getJWTtoken: function () {
    return JWT.sign({ _id: this._id, role: this.role }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY,
    });
  },
  //generate forgotPasswordToken
  generateForgotPasswordToken: function () {
    const forgotToken = crypto.randomBytes(20).toString("hex");
    //step 1 to save to DB
    forgotPasswordToken = crypto
      .createHash("sha256")
      .update(forgotToken)
      .digest("hex");
    forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

    //step 2  return value to user
    return forgotToken;
  },
};

export default mongoose.model("User", userSchema);
