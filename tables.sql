DROP TABLE IF EXISTS topics;

CREATE TABLE topics (
    slug VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    img_url VARCHAR(1000)
)