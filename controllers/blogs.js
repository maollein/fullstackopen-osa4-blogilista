const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const loginCheck = require('../utils/middleware').loginCheck;

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return res.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', loginCheck, async (req, res) => {
  const user = await User.findById(req.userId);
  const blog = new Blog({
    author: req.body.author,
    title: req.body.title,
    url: req.body.url,
    likes: req.body.likes || 0,
    user: user._id
  });

  const savedBlog = await blog.save();
  await Blog.populate(savedBlog, { path: 'user', select: ['name', 'username'] });
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  return res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', loginCheck, async (req, res) => {

  const blogToDelete = await Blog.findById(req.params.id);

  if (blogToDelete) {
    if (blogToDelete.user.toString() === req.userId) {
      await blogToDelete.remove();
      return res.status(204).end();
    } else {
      return res.status(401).json({ error: 'Not authorized' });
    }
  } else {
    return res.status(404).json({ error: 'Blog does not exist' });
  }
});

blogsRouter.put('/:id', loginCheck, async (req, res) => {
  const id = req.params.id;
  const like = req.body.like;
  if (like) {
    const liked = await Blog.findOneAndUpdate({ _id: id }, { $inc: { 'likes': 1 } }, { new: true })
      .populate('user', { name: 1, username: 1 });
    return res.json(liked.toJSON());
  }
  const updateInfo = {
    author: req.body.author,
    title: req.body.title,
    url: req.body.url
  };
  const blog = await Blog.findById(id).populate('user', { _id: 1 });
  if (blog.user._id.toString() === req.userId) {
    const updated = await Blog.findByIdAndUpdate(id, updateInfo, { new: true })
      .populate('user', { username: 1, name: 1 });
    return res.json(updated.toJSON());
  } else res.status(401).json({ error: 'Not authorized' });
});

blogsRouter.post('/:id/comments', loginCheck, async (req, res) => {
  const id = req.params.id;
  const comment = req.body.comment;
  const blog = await Blog.findById(id).populate('user', { name: 1, username: 1 });
  blog.comments.push(comment);
  await blog.save();
  return res.json(blog.toJSON());
});

module.exports = blogsRouter;