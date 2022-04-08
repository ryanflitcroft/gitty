const fetch = require('cross-fetch');

const fetchProgramming = async (count) => {
  return fetch(
    `https://programming-quotes-api.herokuapp.com/Quotes?count=${count}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    }
  ).then((response) => response.json());
};

module.exports = fetchProgramming;
