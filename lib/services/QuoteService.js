const fetchProgramming = require('../utils/programming');
const fetchFuturama = require('../utils/futurama');
const fetchQuotable = require('../utils/quotable');

module.exports = class QuoteService {
  static getProgramming(count) {
    return fetchProgramming(count).then((quotes) =>
      quotes.map((quote) => {
        return {
          author: quote.author,
          description: quote.en,
        };
      })
    );
  }

  static getFuturama(count) {
    return fetchFuturama(count).then((quotes) =>
      quotes.map((quote) => {
        return {
          author: quote.character,
          description: quote.quote,
        };
      })
    );
  }

  static getQuotable(count) {
    return fetchQuotable(count).then((quotes) =>
      quotes.results.map((quote) => {
        return {
          author: quote.author,
          description: quote.content,
        };
      })
    );
  }

  static getAll() {
    return Promise.all([
      QuoteService.getProgramming(1).then((quote) => quote[0]),
      QuoteService.getFuturama(1).then((quote) => quote[0]),
      QuoteService.getQuotable(1).then((quote) => quote[0]),
    ]);
  }
};
