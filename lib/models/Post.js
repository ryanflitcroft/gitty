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

  static async insert({ title, description }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        posts (title, description)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
      [title, description]
    );

    return new Post(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        posts
      `
    );

    return rows.map((row) => new Post(row));
  }
};
