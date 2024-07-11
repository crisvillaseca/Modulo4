const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// CRUD
router.post('/', reservationController.createReservation);
router.get('/', reservationController.getAllReservations);
router.get('/:id', reservationController.getReservationById);
router.put('/:id', reservationController.updateReservation);
router.delete('/:id', reservationController.deleteReservation);

// Filtros
router.get('/filter/by-hotel', reservationController.getReservationsByHotel);
router.get('/filter/by-date-range', reservationController.getReservationsByDateRange);
router.get('/filter/by-room-type', reservationController.getReservationsByRoomType);
router.get('/filter/by-status', reservationController.getReservationsByStatus);
router.get('/filter/by-guest-count', reservationController.getReservationsByGuestCount);

module.exports = router;

router.post('/', reservationController.createReservation);
router.get('/', reservationController.getAllReservations);
router.get('/:id', reservationController.getReservationById);
router.put('/:id', reservationController.updateReservation);
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;

