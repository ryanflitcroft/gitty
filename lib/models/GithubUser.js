const pool = require('../utils/pool');

module.exports = class GithubUser {
  id;
  username;
  email;
  avatarURL;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
    this.avatarURL = row.avatar_url;
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        email=$1
      `,
      [email]
    );

    return new GithubUser(rows[0]);
  }
};
