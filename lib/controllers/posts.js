const { Router } = require('express');
const Post = require('../models/Post');

module.exports = Router().post('/', async (req, res, next) => {
  const post = await Post.insert(req.body);
  console.log('new post: ', post);

  res.send(post);
});
