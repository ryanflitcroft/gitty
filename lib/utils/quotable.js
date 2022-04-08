const fetch = require('cross-fetch');

const fetchQuotable = (count) => {
  return fetch(`https://api.quotable.io/quotes?limit=${count}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  }).then((response) => response.json());
};

module.exports = fetchQuotable;
