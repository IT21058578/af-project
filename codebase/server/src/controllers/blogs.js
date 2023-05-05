import mongoose from "mongoose";
import BlogPost from "../models/BlogPost.js";
// import Comment from "../models/comment.js";

//asyncronous function to retrieve all the blogs from the database
export const getBlogs = async (req, res) => {
  // console.log("req.query", req.query);
  const { page } = req.query;
  try {
    const Limit = 8;
    const startIndex = (Number(page) - 1) * Limit;

    const total = await BlogPost.countDocuments({});
    // console.log("totalblog", total);
    const blogs = await BlogPost.find()
      .populate({ path: "creator", select: "-password -sub" })
      .populate({
        path: "comments",
        populate: { path: "author", select: "-password" },
      })
      .sort({ _id: -1 })
      .limit(Limit)
      .skip(startIndex);

    res.status(200).json({
      data: blogs,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / Limit),
    });
    // res.status(404).json({ message: "Something went wrong" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogPost.findOne({ _id: id })
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "author", select: "-password -sub" },
      });

    res.status(200).json({ blog });
    // res.status(404).json({ message: "Something went wrong" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBlogsBySearch = async (req, res) => {
  // console.log("hit");
  const { searchQuery, tags } = req.query;

  // console.log("req.querySSSSSSSS", req.query);
  // const { page } = req.query;
  // console.log("searchQuery", searchQuery.length);
  // console.log("tags", tags.length);
  try {
    const title = new RegExp(searchQuery, "i");

    // if (searchQuery.length > 0 && tags.length > 0) {
    //   const blogs = await BlogPost.find({
    //     $and: [{ title }, { tags: { $in: tags.split(",") } }],
    //   });
    //   res.status(200).json({ blogs });
    // } else {

    const blogs = await BlogPost.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    })
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "author", select: "-password -sub" },
      });

    if (!blogs.length) {
      res.status(404).json({ message: "No blogs found" });
    } else {
      res.status(200).json({
        blogs,
      });
    }
    // }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const createBlog = async (req, res) => {
  const blog = req.body;
  try {
    const newBlog = new BlogPost(blog);
    newBlog.creator = req.userId;
    newBlog.createdAt = new Date().toISOString();
    console.log("req.userId", req.userId);
    console.log("newBlog", newBlog);

    await newBlog.save();
    console.log("newBlog", newBlog);
    res.status(200).json(newBlog);
  } catch (error) {
    console.log("error", error);
    res.status(409).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  const { id: _id } = req.params;
  const blog = req.body;

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send("No blog with that ID");
  }
  const updatedblog = await BlogPost.findByIdAndUpdate(_id, blog, {
    new: true,
  })
    .populate("creator")
    .populate({
      path: "comments",
      populate: { path: "author", select: "-password -sub" },
    });
  await updatedblog.save();
  res.json(updatedblog);
};

export const deleteBlog = async (req, res) => {
  const { id: _id } = req.params;
  console.log(`deleting blog`);
  console.log("req.userId", req.userId);
  try {
    const blog = await BlogPost.findById(_id).populate("creator");

    console.log("blog.creator._id", blog);
    if (blog.creator._id.equals(req.userId) || blog.creator.sub) {
      console.log("gonna delete");
      if (!mongoose.isValidObjectId(_id)) {
        return res.status(404).send("No blog with that ID");
      }

      await BlogPost.findByIdAndDelete(_id);
      res.json({ message: "blog deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeBlog = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send("No blog with that ID");
  }
  const likeBlog = await BlogPost.findById(_id)
    .populate("creator")
    .populate({
      path: "comments",
      populate: { path: "author", select: "-password -sub" },
    });
  const index = likeBlog.likes.findIndex((id) => id === String(req.userId));
  console.log("blogIndex", index);

  if (index === -1) {
    //like the blog
    likeBlog.likes.push(req.userId);
  } else {
    //dislike the blog
    likeBlog.likes = likeBlog.likes.filter((id) => id !== String(req.userId));
  }
  await likeBlog.save();
  res.json(likeBlog);
};