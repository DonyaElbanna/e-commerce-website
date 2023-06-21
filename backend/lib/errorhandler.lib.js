const { INVALID_IMEI_OR_SERVICE_NUMBER, NO_USER_FOUND, LOW_FUNDS } =
  require("../utils/namespace.util").namespace;

exports.ErrorHandler = async (error) => {
  switch (true) {
    case error.name === "MongoServerError" && error.code === 11000: {
      const err = new Error(error.message);
      err.status = 409;
      throw err;
    }

    case error.name === "ValidationError": {
      const err = new Error(error.message);
      err.status = 409;
      throw err;
    }

    case error.message === "failed" || error.message === "rejected": {
      const err = new Error(INVALID_IMEI_OR_SERVICE_NUMBER);
      err.status = 400;
      throw err;
    }

    case error.message === "NO_USER_FOUND": {
      const err = new Error(NO_USER_FOUND);
      err.status = 409;
      throw err;
    }

    case error.message === "LOW_FUNDS": {
      const err = new Error(LOW_FUNDS);
      err.status = 409;
      throw err;
    }

    default: {
      const err = new Error(error.message);
      err.status = 500;
      throw err;
    }
  }
};
