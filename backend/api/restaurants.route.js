import express from 'express';
import RestaurantsController from './restaurants.controller.js';

const router = express.Router();

router.route('/').get(RestaurantsController.apiGetRestaurants);

// router.route('/review')
//     .post(ReviewsCtrl.apiPostReview)
//     .put(ReviewsCtrl.apiUpdateReview)
//     .delete(ReviewsCtrl.apiDeleteReview)

export default router;