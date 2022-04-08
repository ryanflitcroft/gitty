const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  })
    .then((response) => response.json())
    .then((json) => json.access_token);
};

const getGithubProfile = (token) => {
  return fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  }).then((response) => response.json());
};

module.exports = { exchangeCodeForToken, getGithubProfile };
