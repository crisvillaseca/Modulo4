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
