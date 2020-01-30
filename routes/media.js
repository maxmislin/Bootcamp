import express from 'express';

import { diskStorageSingle } from '../middlewares/diskStorage';
import * as mediaController from '../controllers/mediaController';
import * as commentController from '../controllers/commentController';

const router = express.Router();

router.get('', mediaController.getPosts);
router.post('', mediaController.addPosts);
router.post('/content/image', diskStorageSingle, mediaController.attachMedia);
router.get('/:mediaId', mediaController.getPostById);
router.get('/:mediaId/comments', commentController.getPostComments);
router.post('/:mediaId/comments', commentController.addPostComments);

export default router;
