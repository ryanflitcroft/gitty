const fetch = require('cross-fetch');

const fetchFuturama = (count) => {
  return fetch(`https://futuramaapi.herokuapp.com/api/quotes/${count}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  }).then((response) => response.json());
};

module.exports = fetchFuturama;
