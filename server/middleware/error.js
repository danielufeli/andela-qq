import winston from '../config/winston';

export default (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  process.on('unhandledRejection', (e) => {
    throw e;
  });

  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500);
  res.json({
    message: 'Something Went Wrong Contact The Administrator',
    error: err,
  });
};
