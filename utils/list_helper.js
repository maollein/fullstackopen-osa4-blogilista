const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  let favorite = blogs[0];
  for (const blog of blogs) {
    if (blog.likes > favorite.likes) favorite = blog;
  }
  return favorite;
};

const getAuthors = (blogs) => {
  const authors = [];
  for (const blog of blogs) {
    const author = authors.find(author => author.author === blog.author);
    if(author) {
      author.blogs++;
      author.likes += blog.likes;
    } else {
      authors.push({ author: blog.author, blogs: 1, likes: blog.likes });
    }
  }
  return authors;
};

const mostBlogs = (blogs) => {
  const authors = getAuthors(blogs);
  if (authors.length > 0) {
    let mostBlogs = authors[0];
    for (const author of authors) {
      if (author.blogs > mostBlogs.blogs) mostBlogs = author;
    }
    return { author: mostBlogs.author, blogs: mostBlogs.blogs };
  } else return null;
};

const mostLikes = (blogs) => {
  const authors = getAuthors(blogs);
  if (authors.length > 0) {
    let mostLikes = authors[0];
    for (const author of authors) {
      if (author.likes > mostLikes.likes) mostLikes = author;
    }
    return { author: mostLikes.author, likes: mostLikes.likes };
  } else return null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};