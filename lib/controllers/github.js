const { Router } = require('express');
const jwt = require('jsonwebtoken');
const GithubService = require('../services/GithubService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res, next) => {
    // console.log(res.body);
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })
  .get('/login/callback', async (req, res, next) => {
    try {
      const user = await GithubService.create(req.query.code);

      const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });

      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .redirect('/api/v1/posts');
    } catch (error) {
      next(error);
    }
    // // console.log('!!!', req.query);
    // const { code } = req.query;
    // // console.log('code', code);
    // const token = await exchangeCodeForToken(code);
    // // console.log('token!!!', token);
    // const { login, avatar_url, email } = await getGithubProfile(token);
    // // console.log('user', login, avatar_url, email);

    // let user = await GithubUser.findByEmail(email);
    // // console.log('user??', user);

    // if (!user) {
    //   user = await GithubUser.insert({
    //     username: login,
    //     avatar: avatar_url,
    //     email,
    //   });
    // }
    // // console.log('user!!', user);

    // console.log('payload', payload);

    /*
      TODO:
     * get code x
     * exchange code for token x
     * get info from github about user with token x
     * get existing user if there is one x
     * if not, create one x
     * create jwt x
     * set cookie and redirect
     */
  });
