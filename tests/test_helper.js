const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const initialBlogsContent = [
  {
    auhor: 'Julius Caesar',
    title: 'Alesia',
    url: 'https://gallianvalloitus.example.com',
    likes: 25
  },
  {
    author: 'Vespasianus',
    title: 'Raha ei haise',
    url: 'https://vespasianus.example.com',
    likes: 12
  }
];

let initialUser;

let getInitialUser = () => {
  return initialUser;
};

const getInitialBlogs = (initUser) => {
  const initialBlogs = initialBlogsContent.map(c => {
    return { ...c, user: initUser._id };
  });
  return initialBlogs;
};

const nonExistingId = async () => {
  const blog = new Blog(
    {
      title: 'willremovethissoon',
      author: 'empty',
      url: 'empty',
      likes: 0
    });
  await blog.save();
  await blog.remove();

  return blog.id;
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const insertInitialUser = async () => {
  const passwordHash = await bcrypt.hash('root', 10);

  const user = new User({
    username: 'root',
    name: 'root',
    passwordHash
  });

  const savedUser = await user.save();
  // console.log(savedUser);
  // console.log(savedUser._id);
  initialUser = savedUser;
};

const getToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  return jwt.sign(userForToken, process.env.JWT_SECRET);
};

module.exports = {
  getInitialBlogs, nonExistingId, blogsInDb, insertInitialUser, getToken, initialBlogsContent, getInitialUser
};