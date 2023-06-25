import Post from "../models/postSchema.js";
import User from "../models/userSchema.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await Post.find();
    res.statys(200).json(Post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/******************************************************
 * @cretePost
 * @route http://localhost:5000/api/v1/auth/post/upload
 * @description to create post
 * @returns post
 ******************************************************/

export const createPost = async (req, res) => {
  try {
    //get data from the fronend
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: req.body.public_id,
        url: req.body.url,
      },
      owner: req.user_id,
    };
    const post = await Post.create(newPostData);
    const user = await User.findById(req.user._id);
    user.posts.push(post._id);
    await user.save();

    res.status(201).json({
      success: true,
      post,
      user,
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: error.message,
    });
  }
};
