import ErrorResponse from '../utils/errorResponse.js';

function errorHandler(err, req, res, next) {
  let error = { ...err };

  error.message = err.message;

  //log the error
  console.log(err.stack.red);

  //mongoose bad object ID
  if (err.name === 'CastError') {
    const message = `Ressource not found with the  ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //mongoose duplicate keys
  if (err.code === 11000) {
    const message = `Duplicate field value entred`;
    error = new ErrorResponse(message, 400);
  }

  //validator error
  if (err.name === 'ValidatorError') {
    const message = Object.values(error.errors).map((error) => error.message);
    error = new ErrorResponse(message, 400);
  }

  console.log('error :', error);
  res.status(error.statusCode || 500).json({
    success: false,
    msg: error.message || 'Server Error',
  });
}
export default errorHandler;
