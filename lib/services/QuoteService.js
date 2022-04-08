const fetchProgramming = require('../utils/programming');
const fetchFuturama = require('../utils/futurama');
const fetchQuotable = require('../utils/quotable');

module.exports = class QuoteService {
  static async getProgramming(count) {
    const quotes = await fetchProgramming(count);
    const newQuote = quotes.map((quote) => {
      return {
        author: quote.author,
        description: quote.en,
      };
    });

    return newQuote;
  }

  static async getFuturama(count) {
    const quotes = await fetchFuturama(count);
    const newQuote = quotes.map((quote) => {
      return {
        author: quote.character,
        description: quote.quote,
      };
    });

    return newQuote;
  }

  static async getQuotable(count) {
    const quotes = await fetchQuotable(count);
    const newQuote = quotes.results.map((quote) => {
      return {
        author: quote.author,
        description: quote.content,
      };
    });

    return newQuote;
  }

  static async getAll() {
    const programming = await QuoteService.getProgramming(1);
    const futurama = await QuoteService.getFuturama(1);
    const quotable = await QuoteService.getQuotable(1);

    return [programming[0], futurama[0], quotable[0]];
  }
};
