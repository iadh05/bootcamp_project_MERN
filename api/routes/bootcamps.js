import express from 'express';

import {
  getBootcamps,
  getBootcamp,
  postBootcamps,
  deleteBootcamps,
  updateBootcamps,
} from '../controllers/bootcamps.js';

const router = express.Router();

router.route('/').get(getBootcamps).post(postBootcamps);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

export default router;
