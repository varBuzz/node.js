const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController')

const router = express.Router();

router
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats)
router
  .route('/')
  .get(authController.protect,tourController.getAllTours)
  .post(tourController.createTour)
  .delete(tourController.deleteAllTours);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(authController.protect, authController.restrictTo('admin', 'lead-tour'),tourController.deleteTour);

module.exports = router;
