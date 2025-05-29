DROP TABLE IF EXISTS articles, users, topics;

CREATE TABLE topics (
    slug VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    img_url VARCHAR(1000)
);

CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    avatar_url VARCHAR(1000)
);

CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    topic VARCHAR(50) REFERENCES topic(slug),
    author VARCHAR(50) REFERENCES users(username),
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT DEFAULT 0,
    article_img_url VARCHAR(1000)

);