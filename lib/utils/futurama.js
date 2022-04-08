const fetch = require('cross-fetch');

const fetchFuturama = async (count) => {
  const response = await fetch(
    `https://futuramaapi.herokuapp.com/api/quotes/${count}`,
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

module.exports = fetchFuturama;
