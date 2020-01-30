import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/PostModel';
import { UPLOAD_FOLDER } from '../consts/paths';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('logController');

const addPosts = async (req, res, next) => {
  logger.log('debug', 'addPosts: %j', req.body);
  const { user } = req;
  try {
    const { path } = await MediaModel.getMediaById(req.body.contentId);
    const post = await PostModel.save({
      title: req.body.caption,
      username: user.username,
      media: {
        path,
        contentId: req.body.contentId,
      },
    });
    post.media.path = `http://${process.env.HOST_WIN32}:${process.env.HOST_PORT}${post.media.path}`;
    res.status(200).send({ payload: post });
  } catch (error) {
    next(new AppError(error.message));
  }
};

const attachMedia = async (req, res, next) => {
  logger.log('debug', 'attachMedia: %j', req.body);
 
  const { user } = req;
  const {
    file: { filename },
  } = req;

  try {
    
    const media = await MediaModel.save({
      username: user.username,
      path: `/${UPLOAD_FOLDER}/${filename}`,
    });
   
    res.status(200).send({
      payload: {
        contentId: media.id,
        path: `/${UPLOAD_FOLDER}/${filename}`,
      },
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

const getPosts = async (req, res, next) => {
  logger.log('debug', 'getPosts: %j', req.body);
  try {
    const posts = await PostModel.getRandomPosts();
    posts.forEach(post => {
      post.media.path = `http://${process.env.HOST_WIN32}:${process.env.HOST_PORT}${post.media.path}`;
    });
    res.status(200).send({ payload: posts || [] });
  } catch (error) {
    next(new AppError(error.message));
  }
};

const getPostById = async (req, res, next) => {
  logger.log('debug', 'getPostById: %j', req.body);
  try {
    const post = await PostModel.getPostById(req.params.mediaId);
    res.status(200).send({ payload: post });
  } catch (error) {
    next(new AppError(error.message));
  }
};

export { getPosts, addPosts, attachMedia, getPostById };
