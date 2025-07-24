const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate, createLookupObj } = require("./utils");

const seed = async ({
  topicData,
  userData,
  articleData,
  commentData,
  emojiData,
}) => {
  await db.query(
    `DROP TABLE IF EXISTS emojis, comments, articles, users, topics ;`
  );
  await db.query(`CREATE TABLE topics (
        slug VARCHAR(50) PRIMARY KEY,
        description VARCHAR(255) NOT NULL,
        img_url VARCHAR(1000)
    );`);
  await db.query(`CREATE TABLE users (
        username VARCHAR(50) PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        avatar_url VARCHAR(1000)
    );`);
  await db.query(`CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        topic VARCHAR(50) REFERENCES topics(slug),
        author VARCHAR(50) REFERENCES users(username),
        body TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000)
    );`);
  await db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        article_id INT REFERENCES articles(article_id),
        body TEXT NOT NULL,
        votes INT DEFAULT 0,
        author VARCHAR(50) REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);
  await db.query(`CREATE TABLE emojis (
      emoji_id SERIAL PRIMARY KEY,
      emoji_symbol VARCHAR NOT NULL)`);

  const topicInsertQuery = format(
    `INSERT INTO topics (slug, description, img_url) VALUES %L RETURNING *;`,
    topicData.map(({ slug, description, img_url }) => [
      slug,
      description,
      img_url,
    ])
  );
  await db.query(topicInsertQuery);

  const userInsertData = format(
    `INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *;`,
    userData.map(({ username, name, avatar_url }) => [
      username,
      name,
      avatar_url,
    ])
  );
  await db.query(userInsertData);

  const formattedArticles = articleData.map(convertTimestampToDate);
  const articlesInsertData = format(
    `INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *;`,
    formattedArticles.map(
      ({ title, topic, author, body, created_at, votes, article_img_url }) => [
        title,
        topic,
        author,
        body,
        created_at,
        votes,
        article_img_url,
      ]
    )
  );

  const { rows: insertedArticles } = await db.query(articlesInsertData);
  const articleLookup = createLookupObj(
    insertedArticles,
    "title",
    "article_id"
  );

  const commentsWithIdAndDates = commentData.map((comment) => ({
    ...comment,
    article_id: articleLookup[comment.article_title],
    created_at: convertTimestampToDate(comment).created_at,
  }));

  const commentInsertQuery = format(
    `INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L RETURNING *;`,
    commentsWithIdAndDates.map(
      ({ article_id, body, votes, author, created_at }) => [
        article_id,
        body,
        votes,
        author,
        created_at,
      ]
    )
  );
  const emojiInsertQuery = format(
    `INSERT INTO emojis (emoji_symbol) VALUES %L RETURNING *;`,
    emojiData.map(emoji => [emoji])
  );
  console.log(emojiInsertQuery)
  await db.query(emojiInsertQuery);

  return await db.query(commentInsertQuery);
};
module.exports = seed;
