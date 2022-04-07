const pool = require('../utils/pool');

module.exports = class Post {
  id;
  title;
  description;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.createdAt = row.created_at;
  }

  static insert({ title, description }) {
    return pool
      .query(
        `
      INSERT INTO
        posts (title, description)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
        [title, description]
      )
      .then(({ rows }) => new Post(rows[0]));
  }

  static getAll() {
    return pool
      .query(
        `
      SELECT
        *
      FROM
        posts
      `
      )
      .then(({ rows }) => rows.map((row) => new Post(row)));
  }
};
