const pool = require('../utils/pool');

module.exports = class Quote {
  id;
  author;
  content;

  constructor(row) {
    this.id = row.id;
    this.author = row.author;
    this.content = row.content;
  }

  static async insert({ author, content }) {}
};
