const fetchProgramming = require('../utils/programming');

module.exports = class QuoteService {
  static async getProgramming() {
    const quotes = await fetchProgramming();
    const newQuote = quotes.map((quote) => {
      return {
        author: quote.author,
        description: quote.en,
      };
    });
    return newQuote;
  }
};
