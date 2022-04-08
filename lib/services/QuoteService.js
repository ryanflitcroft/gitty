const fetchProgramming = require('../utils/programming');

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
};
