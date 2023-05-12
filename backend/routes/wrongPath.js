const wrongPathRouter = require('express').Router();
const { wrongPath } = require('../controllers/wrongPath');

wrongPathRouter.all('/', wrongPath);

module.exports = wrongPathRouter;
