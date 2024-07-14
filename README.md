![Banner](banner.png)
# Proyecto 4: API de reservacion de hotel
## Planteamiento.
En este pryecto, construirás una aplicación de servicios para la gestión de reservas en hoteles que involucre las 4 operaciones `CRUD` y otras 6 adicionales relacionadas con filtros, utilizando Node.js y Express.  Opcionalmente, realizarás un proceso de investigación relacionado con la documentación de API, usando Swagger, con la estandarización OPENAPI, la cual se utiliza en equipos internacionales para construir servicios escalables.
## Requisitos y caracteristicas.
- Utilizar Node.js y Express para el desarrollo del servidor.
- Contar con un archivo `.env` para las variables de entorno, el cual establecerás el puerto.
- Contar con un archivo `.gitignore` que incluya las carpetas y archivos que deberán ocultarse para el repositorio.
- Usar una arquitectura de carpetas clara. La idea es que la asignación de responsabilidades de tu código pueda ser ubicado fácilmente.
- Implementar los siguientes 10 endpoints:
  |Descripcion del endpoint|Método|Endpoint|
  |---|---|---|
  |Crear reserva|POST|/api/reservas|
  |Obtener la lista de reservas|GET|/api/reservas|
  |Obtener información de una reserva específica|GET|/api/reservas/:id|
  |Actualizar información de una reserva|PUT|/api/reservas/:id|
  |Eliminar una reserva específica|DELETE|/api/reservas/:id|
  |Filtrar reservas por hotel|GET|/api/reservas?hotel=HOTEL|
  |Filtrar reservas por rango de fechas|GET|/api/reservas?fecha_inicio=FECHA_INICIO&fecha_fin=FECHA_FIN|
  |Filtrar reservas por tipo de habitación|GET|/api/reservas?tipo_habitacion=TIPO_HABITACION|
  |Filtrar reservas por estado|GET|/api/reservas?estado=ESTADO|
  |Filtrar reservas por número de huéspedes|GET|/api/reservas?num_huespedes=NUM_HUESPEDES|
  

- Opcionalmente, documentar todos tus `endpoints` utilizando `Swagger` y `OpenAPI`.
  ## Detalles de implementación.
Uso de `package.json` y dependencias.
```ruby
{
  "name": "hotel-reservation",
  "version": "1.0.0",
  "description": "API para la gestión de reservas en hoteles",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^4.6.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  },
  "author": "Bastian_Villaseca",
  "license": "ISC"
}
```
Dependencias:
- `dotenv`(v8.2.0): para las variables de entorno.
- `express`(v4.17.1): para configurar rutas y servidor http.
- `swagger-jsdoc`(v6.2.8): para generar documentación Swagger a partir de comentarios.
- `swagger-ui-express`(v4.6.3):para servir la documentación Swagger como una página web interactiva.

Uso de `.env` para variables de entorno, en este caso el puerto.

Uso de `.gitignore` para establecer los archivos y carpetas que serán ignorados por el proceso que GIT realiza.

Uso de `reservationController.js`:
```ruby
const reservations = [];

exports.createReservation = (req, res) => {
  const newReservation = req.body;
  newReservation.id = reservations.length + 1; 
  reservations.push(newReservation);
  res.status(201).json(newReservation);
};

exports.getAllReservations = (req, res) => {
  const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.query;
  let filteredReservations = reservations;

  if (hotel) {
    filteredReservations = filteredReservations.filter(r => r.hotel === hotel);
  }

  if (fecha_inicio && fecha_fin) {
    filteredReservations = filteredReservations.filter(r => new Date(r.fecha) >= new Date(fecha_inicio) && new Date(r.fecha) <= new Date(fecha_fin));
  }

  if (tipo_habitacion) {
    filteredReservations = filteredReservations.filter(r => r.tipo_habitacion === tipo_habitacion);
  }

  if (estado) {
    filteredReservations = filteredReservations.filter(r => r.estado === estado);
  }

  if (num_huespedes) {
    filteredReservations = filteredReservations.filter(r => r.num_huespedes == num_huespedes);
  }

  res.status(200).json(filteredReservations);
};

exports.getReservationById = (req, res) => {
  const reservation = reservations.find(r => r.id === parseInt(req.params.id));
  if (!reservation) {
    return res.status(404).json({ message: 'Reserva no encontrada' });
  }
  res.status(200).json(reservation);
};

exports.updateReservation = (req, res) => {
  const reservation = reservations.find(r => r.id === parseInt(req.params.id));
  if (!reservation) {
    return res.status(404).json({ message: 'Reserva no encontrada' });
  }
  Object.assign(reservation, req.body);
  res.status(200).json(reservation);
};

exports.deleteReservation = (req, res) => {
  const reservationIndex = reservations.findIndex(r => r.id === parseInt(req.params.id));
  if (reservationIndex === -1) {
    return res.status(404).json({ message: 'Reserva no encontrada' });
  }
  reservations.splice(reservationIndex, 1);
  res.status(204).send();
};

exports.getReservationsByHotel = (req, res) => {
  const { hotel } = req.query;
  const filteredReservations = reservations.filter(r => r.hotel === hotel);
  res.status(200).json(filteredReservations);
};

exports.getReservationsByDateRange = (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query;
  const filteredReservations = reservations.filter(r => new Date(r.fecha) >= new Date(fecha_inicio) && new Date(r.fecha) <= new Date(fecha_fin));
  res.status(200).json(filteredReservations);
};

exports.getReservationsByRoomType = (req, res) => {
  const { tipo_habitacion } = req.query;
  const filteredReservations = reservations.filter(r => r.tipo_habitacion === tipo_habitacion);
  res.status(200).json(filteredReservations);
};

exports.getReservationsByStatus = (req, res) => {
  const { estado } = req.query;
  const filteredReservations = reservations.filter(r => r.estado === estado);
  res.status(200).json(filteredReservations);
};

exports.getReservationsByGuestCount = (req, res) => {
  const { num_huespedes } = req.query;
  const filteredReservations = reservations.filter(r => r.num_huespedes == num_huespedes);
  res.status(200).json(filteredReservations);
};
```

Uso de `reservationRoutes.js`:
```ruby
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
```
