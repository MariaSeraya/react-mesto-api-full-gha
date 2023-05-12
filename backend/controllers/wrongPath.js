const NotFoundError = require('../erorrs/not-found-error');

const wrongPath = (res, req, next) => {
  next(new NotFoundError('По указанному адресу страница не найдена'));
};

module.exports = { wrongPath };
