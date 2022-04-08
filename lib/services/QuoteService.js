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

  static async getAll() {
    const programming = await QuoteService.getProgramming(1);
    const futurama = await QuoteService.getFuturama(1);
    const quotable = await QuoteService.getQuotable(1);

    return [programming[0], futurama[0], quotable[0]];
  }
};
