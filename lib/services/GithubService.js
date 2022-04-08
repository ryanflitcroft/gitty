const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class GithubService {
  static create(code) {
    let githubProfile;
    return exchangeCodeForToken(code)
      .then((token) => getGithubProfile(token))
      .then((profile) => {
        githubProfile = profile;
        return GithubUser.findByUsername(profile.login);
      })
      .then((user) => {
        if (!user) {
          return GithubUser.insert({
            username: githubProfile.login,
            avatar: githubProfile.avatar_url,
            email: githubProfile.email,
          });
        } else return user;
      });
  }
};
