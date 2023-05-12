const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  editUserInfo,
  editAvatar,
  getProfile,
} = require('../controllers/users');
const { regExpUrl } = require('../utills/constants');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getProfile);

usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), editUserInfo);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regExpUrl).required(),
  }),
}), editAvatar);

module.exports = usersRouter;
