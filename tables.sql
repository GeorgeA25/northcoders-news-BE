DROP TABLE IF EXISTS users, topics;

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