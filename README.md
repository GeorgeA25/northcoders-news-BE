📰 Northcoders News Backend

---

🔗 Backend API Live on Render: https://nc-news-api-aoq3.onrender.com/api

---

📖 Project Overview

A backend project that contains a PostgreSQL database which was made to store and organize selected data across multiple tables including users, topics, comments, and articles. I also used Express.js to build a REST API so that my frontend project could interact with the data through GET, PATCH, POST, and DELETE requests whilst maintaining clean coding practices and using TDD to test.

---

🛠️ Quick Start Guide

Clone the Repository

git clone https://github.com/GeorgeA25/northcoders-news-BE.git  
cd northcoders-news-BE

---

Prerequisites
Ensure you have the following installed:

Node.js v18+

PostgreSQL v14+

---

Install Dependencies

npm install

---

⚙️ Environment Configuration

To connect your project to the correct local databases, create two environment files in the root of the project:

.env.development

.env.test

---

How I Created Them:
Inside the northcoders-news-BE folder, I created two new files called .env.development and .env.test.


File name: .env.development

PGDATABASE=nc_news

File name: .env.test

PGDATABASE=nc_news_test

These tell PostgreSQL which database to connect to depending on the environment (development or testing).

---

🗃️ Set Up the Database

npm run setup-dbs

npm run seed

This creates and seeds the local development and test databases with sample data.

---

🚀 Run the Server

npm start

By default, the API runs at:

http://localhost:9090/api

---

🧪 Run Tests

npm test

Runs the full test suite using Jest and Supertest.

---

🔌 Available API Endpoints

GET /api

GET /api/topics

GET /api/articles

GET /api/articles/:article_id

PATCH /api/articles/:article_id

POST /api/articles/:article_id/comments

GET /api/articles/:article_id/comments

PATCH /api/comments/:comment_id

DELETE /api/comments/:comment_id

GET /api/users

---

📝 Project Structure

├── db/
│   ├── data/
│   ├── seed/
│   ├── connection.js
│   ├── setup-dbs.sql

├── controllers/

├── models/

├── routes/

├── tests/

├── public/

├── utils/

├── endpoints.js

├── errorHandler.js

├── listen.js

├── app.js

├── server.js

├── package.json

├── package-lock.json

└── .gitignore



---

✅ Tech Stack

Language: JavaScript (Node.js v18+)

Framework: Express.js

Database: PostgreSQL v14+

Testing: Jest & Supertest

Environment Management: dotenv

Hosting: Superbase & Render

---

ℹ️ Development Notes

.env.development is used by default in development.

.env.test is used when running tests with npm test.

Running npm run setup-dbs resets both the development and test databases.

Add additional environment variables (like DB_HOST) if needed for custom setups.

---

Created by George Asteriades

