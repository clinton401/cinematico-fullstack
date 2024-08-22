const {newError, errorHandler} = require("../lib/utils");
const foundErrorsHandler = (
    err,
    req,
    res,
    next
  ) => {
    console.error(err);
    res
      .status(err.status || 500)
      .json(
        errorHandler(err.message || "Internal Server Error", err.status || 500)
      );
  };


const notFound = (req, res, next) => {
    res
    .status(404)
    .json(errorHandler("No route matches your request", 404));
}

module.exports = {foundErrorsHandler, notFound}