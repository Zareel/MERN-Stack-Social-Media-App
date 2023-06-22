import Post from "../models/postSchema.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await postMessage.find();
    res.statys(200).json(postSchema);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

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
    const newPost = await Post.create(newPostData);
    res.status(201).json({
      success: true,
      post: newPost,
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: error.message,
    });
  }
};
