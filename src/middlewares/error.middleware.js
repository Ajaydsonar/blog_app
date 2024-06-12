const errorHandler = (err, req, res, next) => {
  // Default to 500 Internal Server Error if no status code is set
  const statusCode = err.statusCode || 500;
  const response = {
    success: err.success || false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    data: err.data || null,
  };

  // Include stack trace only in development mode
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export { errorHandler };
