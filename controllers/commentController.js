import * as CommentModel from '../models/CommentModel';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('logController');

const getPostComments = async (req, res, next) => {
  logger.log('debug', 'getPostComments: %j', req.body);
  try {
    const comments = await CommentModel.getCommentsByPost(req.params.mediaId);
    res.status(200).send({ payload: { comments } });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const addPostComments = async (req, res, next) => {
  logger.log('debug', 'addPostComments: %j', req.body);
  const { user } = req;
  try {
    await CommentModel.save({
      message: req.body.text,
      username: user.username,
      mediaId: req.params.mediaId,
    });
    res.status(201).send();
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export { getPostComments, addPostComments };
