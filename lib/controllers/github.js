const { query } = require('express');
const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');
const jwt = require('jsonwebtoken');

module.exports = Router()
  .get('/login', async (req, res, next) => {
    // console.log(res.body);
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })
  .get('/login/callback', async (req, res, next) => {
    // console.log('!!!', req.query);
    const { code } = req.query;
    // console.log('code', code);
    const token = await exchangeCodeForToken(code);
    // console.log('token!!!', token);
    const { login, avatar_url, email } = await getGithubProfile(token);
    // console.log('user', login, avatar_url, email);

    let user = await GithubUser.findByEmail(email);
    console.log('user??', user);

    if (!user) {
      user = await GithubUser.insert({
        username: login,
        avatar: avatar_url,
        email,
      });
    }
    console.log('user!!', user);

    const payload = jwt.sign(user.toJSON);

    /*
      TODO:
     * get code x
     * exchange code for token x
     * get info from github about user with token x
     * get existing user if there is one x
     * if not, create one x
     * create jwt
     * set cookie and redirect
     */
  });
