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

/**
 * @DELETE_Post
 * @route http://localhost:5000/api//:collectionId
 * @description Controller for deleting the collection
 * @description Only admin can delete the collection
 */

export const deletePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const postToDelete = await Post.findById(postId);

    if (!postToDelete) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    postToDelete.remove();
    res.status(200).json({
      success: true,
      message: "Post has been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const likeAndUnlike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
