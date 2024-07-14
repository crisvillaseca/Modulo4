const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - hotel
 *         - fecha
 *         - tipo_habitacion
 *         - num_huespedes
 *       properties:
 *         id:
 *           type: integer
 *         hotel:
 *           type: string
 *         fecha:
 *           type: string
 *           format: date
 *         tipo_habitacion:
 *           type: string
 *         num_huespedes:
 *           type: integer
 */
// CRUD
/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Reserva creada
 */
router.post('/', reservationController.createReservation);
/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Obtener la lista de reservas
 *     tags: [Reservation]
 *     responses:
 *       200:
 *         description: Lista de reservas
 */
router.get('/', reservationController.getAllReservations);
/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Obtener información de una reserva específica
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Información de la reserva
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id', reservationController.getReservationById);
/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Actualizar información de una reserva
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Reserva actualizada
 *       404:
 *         description: Reserva no encontrada
 */
router.put('/:id', reservationController.updateReservation);
/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Eliminar una reserva específica
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Reserva eliminada
 *       404:
 *         description: Reserva no encontrada
 */
router.delete('/:id', reservationController.deleteReservation);

// Filtros
/**
 * @swagger
 * /api/reservations/filter/hotel:
 *   get:
 *     summary: Filtrar reservas por hotel
 *     tags: [Reservation]
 *     parameters:
 *       - in: query
 *         name: hotel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de reservas filtradas
 */
router.get('/filter/by-hotel', reservationController.getReservationsByHotel);
/**
 * @swagger
 * /api/reservations/filter/date:
 *   get:
 *     summary: Filtrar reservas por rango de fechas
 *     tags: [Reservation]
 *     parameters:
 *       - in: query
 *         name: fecha_inicio
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: fecha_fin
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Lista de reservas filtradas
 */
router.get('/filter/by-date-range', reservationController.getReservationsByDateRange);
/**
 * @swagger
 * /api/reservations/filter/room-type:
 *   get:
 *     summary: Filtrar reservas por tipo de habitación
 *     tags: [Reservation]
 *     parameters:
 *       - in: query
 *         name: tipo_habitacion
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de reservas filtradas
 */
router.get('/filter/by-room-type', reservationController.getReservationsByRoomType);
/**
 * @swagger
 * /api/reservations/filter/status:
 *   get:
 *     summary: Filtrar reservas por estado
 *     tags: [Reservation]
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de reservas filtradas
 */
router.get('/filter/by-status', reservationController.getReservationsByStatus);
/**
 * @swagger
 * /api/reservations/filter/guest-count:
 *   get:
 *     summary: Filtrar reservas por número de huéspedes
 *     tags: [Reservation]
 *     parameters:
 *       - in: query
 *         name: num_huespedes
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de reservas filtradas
 */
router.get('/filter/by-guest-count', reservationController.getReservationsByGuestCount);

module.exports = router;


