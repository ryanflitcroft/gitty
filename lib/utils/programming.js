const fetch = require('cross-fetch');

const fetchProgramming = async (count) => {
  const response = await fetch(
    `https://programming-quotes-api.herokuapp.com/Quotes?count=${count}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    }
  );

  const json = await response.json();
  return json;
};

module.exports = fetchProgramming;
