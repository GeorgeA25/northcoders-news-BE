const handle404 = (request, response, next) => {
  response.status(404).send({ message: "Route not found" });
};

const handle400 = (error, request, response, next) => {
  if (error.code === "22P02") {
    response.status(400).send({ message: "bad request" });
  } else {
    next(error);
  }
};

const handle500 = (error, request, response, next) => {
  response.status(500).send({ message: "Internal server error" });
};

module.exports = { handle404, handle400, handle500 };
