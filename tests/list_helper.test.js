const listHelper = require('../utils/list_helper');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];

const listWithZeroBlogs = [];

const listWithTwoBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Princepsin sunnuntai',
    author: 'Augustus Caesar',
    url: 'tba',
    likes: 3,
    __v: 0
  }
];

const listWithFiveBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Princepsin sunnuntai',
    author: 'Augustus Caesar',
    url: 'tba',
    likes: 3,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17d7',
    title: 'Diktaattorin heinäkuu',
    author: 'Julius Caesar',
    url: 'tba',
    likes: 1,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17g3',
    title: 'Vesuviuksen purkaus',
    author: 'Plinius Nuorempi',
    url: 'tba',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17a1',
    title: 'Juudean sotaretki',
    author: 'Titus',
    url: 'tba',
    likes: 7,
    __v: 0
  }
];

const listWithSixBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Princepsin sunnuntai',
    author: 'Augustus Caesar',
    url: 'tba',
    likes: 3,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17d7',
    title: 'Diktaattorin heinäkuu',
    author: 'Julius Caesar',
    url: 'tba',
    likes: 1,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17g3',
    title: 'Vesuviuksen purkaus',
    author: 'Plinius Nuorempi',
    url: 'tba',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17h6',
    title: 'Matkaselvitys',
    author: 'Plinius Nuorempi',
    url: 'tba',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17a1',
    title: 'Juudean sotaretki',
    author: 'Titus',
    url: 'tba',
    likes: 7,
    __v: 0
  }
];

const listWithSevenBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Princepsin sunnuntai',
    author: 'Augustus Caesar',
    url: 'tba',
    likes: 3,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17d7',
    title: 'Diktaattorin heinäkuu',
    author: 'Julius Caesar',
    url: 'tba',
    likes: 1,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17g3',
    title: 'Vesuviuksen purkaus',
    author: 'Plinius Nuorempi',
    url: 'tba',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17h6',
    title: 'Matkaselvitys',
    author: 'Plinius Nuorempi',
    url: 'tba',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17a1',
    title: 'Juudean sotaretki',
    author: 'Titus',
    url: 'tba',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17b2',
    title: 'O tempora, O mores!',
    author: 'Cicero',
    url: 'tba',
    likes: 10,
    __v: 0
  }
];

const listWithEightBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Princepsin sunnuntai',
    author: 'Augustus Caesar',
    url: 'tba',
    likes: 3,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17d7',
    title: 'Diktaattorin heinäkuu',
    author: 'Julius Caesar',
    url: 'tba',
    likes: 1,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17g3',
    title: 'Vesuviuksen purkaus',
    author: 'Plinius Nuorempi',
    url: 'tba',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17h6',
    title: 'Matkaselvitys',
    author: 'Plinius Nuorempi',
    url: 'tba',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17a1',
    title: 'Juudean sotaretki',
    author: 'Titus',
    url: 'tba',
    likes: 17,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17b2',
    title: 'O tempora, O mores!',
    author: 'Cicero',
    url: 'tba',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17h6',
    title: 'Raportti Pontuksesta ja Bithyniasta',
    author: 'Plinius Nuorempi',
    url: 'tba',
    likes: 9,
    __v: 0
  }
];

test('dummy returns one', () => {
  //const blogs = []

  const result = listHelper.dummy();
  expect(result).toBe(1);
});

describe('total likes', () => {

  test('List has one blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('List has two blogs', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs);
    expect(result).toBe(8);
  });

  test('List has zero blogs', () => {
    const result = listHelper.totalLikes(listWithZeroBlogs);
    expect(result).toBe(0);
  });

  test('List has six blogs', () => {
    const result = listHelper.totalLikes(listWithSixBlogs);
    expect(result).toBe(26);
  });
});

describe('Favorite blog', () => {

  test('List has zero blogs', () => {
    const result = listHelper.favoriteBlog(listWithZeroBlogs);
    expect(result).toEqual(null);
  });

  test('List has one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test('List has two blogs', () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs);
    expect(result).toEqual(listWithTwoBlogs[0]);
  });

  test('List has six blogs', () => {
    const result = listHelper.favoriteBlog(listWithSixBlogs);
    expect(result).toEqual(listWithSixBlogs[3]);
  });

  test('List has two most liked blogs', () => {
    const result = listHelper.favoriteBlog(listWithSevenBlogs);
    expect(result).toEqual(listWithSevenBlogs[3]);
  });
});

describe('Most blogs', () => {

  test('Plinius has most blogs', () => {
    const result = listHelper.mostBlogs(listWithSixBlogs);
    //console.log(result);
    expect(result).toEqual({ author: 'Plinius Nuorempi', blogs: 2 });
  });

  test('Only one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    //console.log(result);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });

  test('Empty list of blogs', () => {
    const result = listHelper.mostBlogs([]);
    //console.log(result);
    expect(result).toEqual(null);
  });

  test('All have one blog', () => {
    const result = listHelper.mostBlogs(listWithFiveBlogs);
    //console.log(result);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });
});

describe('Most liked author', () => {

  test('Plinius is most liked', () => {
    const result = listHelper.mostLikes(listWithSixBlogs);
    //console.log(result);
    expect(result).toEqual({ author: 'Plinius Nuorempi', likes: 10 });
  });

  test('Only one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    //console.log(result);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });

  test('Empty list of blogs', () => {
    const result = listHelper.mostLikes([]);
    //console.log(result);
    expect(result).toEqual(null);
  });

  test('All have one blog', () => {
    const result = listHelper.mostLikes(listWithFiveBlogs);
    //console.log(result);
    expect(result).toEqual({ author: 'Plinius Nuorempi', likes: 10 });
  });

  test('Plinius has three blogs and is most liked', () => {
    const result = listHelper.mostLikes(listWithEightBlogs);
    //console.log(result);
    expect(result).toEqual({ author: 'Plinius Nuorempi', likes: 19 });
  });
});