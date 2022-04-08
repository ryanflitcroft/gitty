const fetch = require('cross-fetch');

const fetchQuotable = async (count) => {
  const response = await fetch(
    `https://api.quotable.io/quotes?limit=${count}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    }
  );

  const json = response.json();
  return json;
};

module.exports = fetchQuotable;
