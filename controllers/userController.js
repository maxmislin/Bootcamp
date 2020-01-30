import * as UserModel from '../models/UserModel';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('logController');

const getUserInfo = async (req, res) => {
  logger.log('debug', 'logIn: %j', req.body);
  const { user } = req;
  res.status(200).send({
    payload: {
      id: user._id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    },
  });
};

const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.getUsers();

    res.status(200).send({
      payload: users,
    });
  } catch (err) {
    next(new AppError(err.message));
  }
};

export { getUserInfo, getUsers };