const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class GithubService {
  static async create(code) {
    // console.log('code', code);
    const token = await exchangeCodeForToken(code);
    // console.log('token!!!', token);
    const { login, avatar_url, email } = await getGithubProfile(token);
    // console.log('user', login, avatar_url, email);

    let user = await GithubUser.findByEmail(email);
    // console.log('user??', user);

    if (!user) {
      user = await GithubUser.insert({
        username: login,
        avatar: avatar_url,
        email,
      });
    }

    return user;
  }
};
