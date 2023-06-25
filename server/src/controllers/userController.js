import User from "../models/userSchema.js";

export const cookieOptions = {
  expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

/******************************************************
 * @Register
 * @route http://localhost:5000/api/v1/auth/register
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/

export const register = async (req, res) => {
  try {
    //get datafrom the frontend
    const { name, email, password } = req.body;
    //validation
    if (!name || !email || !password) {
      return res.send({ message: "All the fields are required" });
    }
    //check if the user is already exist
    const existingUser = await User.findOne({ email });
    //if user exists send message
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "Already registered. Please login",
      });
    }
    //let the new user signup and create user
    const user = await User.create({
      name,
      email,
      password,
      avtar: { public_id: "sample_id", url: "sample_url" },
    });

    const token = user.getJWTtoken();
    //safety
    user.password = undefined;

    //store this token in user's cookies
    res.cookie("token", token, cookieOptions);

    //send back response to user
    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*********************************************************
 * @LOGIN
 * @route http://localhost:5000/api/v1/auth/login
 * @description User Login Controller for signing in the user
 * @returns User Object
 *********************************************************/

export const login = async (req, res) => {
  try {
    // get data from the frontend
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    // chain on select() method and pass on what you want to select
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist, please register",
      });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (isPasswordMatched) {
      const token = user.getJWTtoken();
      user.password = undefined;
      res.cookie("token", token, cookieOptions);
      return res.status(200).json({
        success: true,
        token,
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
