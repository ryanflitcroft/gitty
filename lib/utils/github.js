const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  });

  const { access_token } = await response.json();
  console.log('accsstoken', access_token);
  return access_token;
};

const getGithubProfile = async (token) => {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  const res = await response.json();
  console.log('respnse', res);
  return res;
};

module.exports = { exchangeCodeForToken, getGithubProfile };
