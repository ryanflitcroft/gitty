const { query } = require('express');
const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

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

    const user = await GithubUser.findByEmail(email);
    console.log('user??', user);
    if (!user) {
      GithubUser.insert({
        username: login,
        avatar: avatar_url,
        email,
      });
    }

    /*
      TODO:
     * get code x
     * exchange code for token x
     * get info from github about user with token x
     * get existing user if there is one
     * if not, create one
     * create jwt
     * set cookie and redirect
     */
  });
