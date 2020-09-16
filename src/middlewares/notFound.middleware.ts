function handleNotFound(req: TRequest, res: TResponse, _next: TNext) {
  const statusCode = 404;
  res.status(statusCode).json({
    status: 'Not Found',
    url: req.url,
    statusCode
  });
}

export default handleNotFound;
