const { query } = require('express');
const { Router } = require('express');

module.exports = Router()
  .get('/login', async (req, res, next) => {
    console.log(res.body);
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })
  .get('/login/callback', async (req, res, next) => {
    console.log('!!!', req.query);
    const { code } = req.query;
    console.log('code', code);

    /*
      TODO:
     * get code
     * exchange code for token
     * get info from github about user with token
     * get existing user if there is one
     * if not, create one
     * create jwt
     * set cookie and redirect
     */
  });
