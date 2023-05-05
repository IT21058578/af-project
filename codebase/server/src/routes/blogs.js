import express from 'express';

import { getBlogs, getBlogsBySearch, getBlog, createBlog, updateBlog, likeBlog, deleteBlog } from '../controllers/blogs.js';

const router = express.Router();
import auth from "../middleware/auth.js";

// router.get('/creator', getBlogsByCreator);
router.get('/search', getBlogsBySearch);
router.get('/', getBlogs);
router.get('/:id', getBlog);

router.post('/', auth,  createBlog);
router.patch('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);
router.patch('/:id/likeBlog', auth, likeBlog);
// router.post('/:id/commentBlog', commentBlog);


export default router;