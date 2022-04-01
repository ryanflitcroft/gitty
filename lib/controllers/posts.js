const { Router } = require('express');
const Post = require('../models/Post');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    const post = await Post.insert(req.body);

    res.send(post);
  })

  .get('/', authenticate, async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.send(posts);
    } catch (error) {
      next(error);
    }
  });
