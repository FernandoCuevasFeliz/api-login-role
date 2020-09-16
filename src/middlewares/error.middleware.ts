function handleError(err: any, _req: TRequest, res: TResponse, _next: TNext) {
  const { message, statusCode = 500 } = err;
  res.status(statusCode).json({ status: 'Error', message, statusCode });
}

export default handleError;
