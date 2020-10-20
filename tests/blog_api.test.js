const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  await helper.insertInitialUser();
  // console.log('helper user: ', helper.getInitialUser());
  await Blog.insertMany(helper.getInitialBlogs(helper.getInitialUser()));
});

describe('Blog tests', () => {


  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogsContent.length);
  });

  test('id field is defined', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });

  test('Blog can be added', async () => {
    const newBlog = {
      user: helper.getInitialUser()._id,
      title: 'Merimatka Roomaan',
      url: 'https://tituscaesar.example.com/blog/merimatkaroomaan',
      likes: 3
    };

    await api.post('/api/blogs')
      .set('Authorization', `bearer ${helper.getToken(helper.getInitialUser())}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAfterPost = await helper.blogsInDb();
    expect(blogsAfterPost).toHaveLength(helper.initialBlogsContent.length + 1);

    const titles = blogsAfterPost.map(b => b.title);
    expect(titles).toContain('Merimatka Roomaan');
  });

  test('Default likes is 0', async () => {
    const newBlog = {
      user: helper.getInitialUser()._id,
      title: 'Merimatka Roomaan',
      url: 'https://tituscaesar.example.com/blog/merimatkaroomaan',
    };

    await api.post('/api/blogs')
      .set('Authorization', `bearer ${helper.getToken(helper.getInitialUser())}`)
      .send(newBlog)
      .expect(201);

    const blogs = await helper.blogsInDb();
    const added = blogs.find(blog => blog.title === newBlog.title);
    expect(added.likes).toBe(0);
  });

  test('Missing title field results in HTTP 400', async () => {
    const newBlog = {
      user: helper.getInitialUser()._id,
      url: 'https://tituscaesar.example.com/blog/merimatkaroomaan',
      likes: 4
    };

    await api.post('/api/blogs')
      .set('Authorization', `bearer ${helper.getToken(helper.getInitialUser())}`)
      .send(newBlog)
      .expect(400);
  });

  test('Missing url field results in HTTP 400', async () => {
    const newBlog = {
      user: helper.getInitialUser()._id,
      likes: 4,
      title: 'Merimatka Roomaan'
    };

    await api.post('/api/blogs')
      .set('Authorization', `bearer ${helper.getToken(helper.getInitialUser())}`)
      .send(newBlog)
      .expect(400);
  });

  test('Deleting a blog is possible and results in HTTP 204', async () => {
    const blogs = await helper.blogsInDb();
    const blogToDelete = blogs[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${helper.getToken(helper.getInitialUser())}`)
      .expect(204);

    const blogsAfterDelete = await helper.blogsInDb();
    expect(blogsAfterDelete).toHaveLength(blogs.length -1);

    const ids = blogsAfterDelete.map(b => b.id);
    expect(ids).not.toContain(blogToDelete.id);
  });

  test('Trying to delete by non existing id returns 404', async () => {
    const nonExistingId = await helper.nonExistingId();

    await api.delete(`/api/blogs/${nonExistingId}`)
      .set('Authorization', `bearer ${helper.getToken(helper.getInitialUser())}`)
      .expect(404);
  });

  test('Trying to delete by malformatted id returns 400', async () => {
    await api.delete('/api/blogs/1324341231')
      .set('Authorization', `bearer ${helper.getToken(helper.getInitialUser())}`)
      .expect(400);
  });

  test('Blog can be updated', async () => {
    const blogs = await helper.blogsInDb();
    const toBeUpdated = blogs[0];
    const newInfo = {
      author: 'Päivitetty kirjoittaja',
      title: 'Päivitetty otsikko',
      url: 'Päivitetty url',
      likes: 14
    };

    await api.put(`/api/blogs/${toBeUpdated.id}`)
      .set('Authorization', `bearer ${helper.getToken(helper.getInitialUser())}`)
      .send(newInfo)
      .expect(200);

    const blogsAfterUpdate = await helper.blogsInDb();
    const updatedBlog = blogsAfterUpdate.find(blog => blog.id === toBeUpdated.id);
    expect(updatedBlog).toEqual({ ...newInfo, id: toBeUpdated.id, user: helper.getInitialUser()._id });
  });
});

describe('User tests', () => {

  test('Under 3 character passwords rejected', async () => {
    const user = {
      username: 'Testi',
      name: 'Testi',
      password: 'Te'
    };

    const result = await api.post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Password must be at least 3 characters long');
  });

  test('Nonexistant password rejected', async () => {
    const user = {
      username: 'Testi',
      name: 'Testi'
    };

    const result = await api.post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Password must be at least 3 characters long');
  });

  test('Under 3 character usernames rejected', async () => {
    const user = {
      username: 'Te',
      name: 'Testi',
      password: 'Testi'
    };

    const result = await api.post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('User validation failed: username: Path `username` (`Te`) is shorter than the minimum allowed length');
  });

  test('Nonexistant usernames rejected', async () => {
    const user = {
      name: 'Testi',
      password: 'Testi'
    };

    const result = await api.post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Path `username` is required');
  });

  test('Non unique usernames rejected', async () => {
    const user = {
      username: 'root',
      name: 'root',
      password: 'root'
    };

    const result = await api.post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
