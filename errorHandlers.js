const handle404 = (request, response, next) =>
  response.status(404).send({ message: "Route not found" });

const handle400 = (error, request, response, next) => {
  if (error.code === "22P02") {
    response.status(400).send({ message: "Bad request" });
  } else {
    next(error);
  }
};

const customHandlerError = (error, request, response, next) => {
  if (error.status && error.message) {
    return response.status(error.status).send({ message: error.message });
  } else {
    next(error);
  }
};
const handle500 = (error, request, response, next) => {
  console.log(error);
  response.status(500).send({ message: "Internal server error" });
};

module.exports = { handle404, handle400, customHandlerError, handle500 };
