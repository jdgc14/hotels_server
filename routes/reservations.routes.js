const express = require('express')

// Controllers
const {
    createReservation,
    payReservation,
    getReservations,
    deleteReservationById,
} = require('../controllers/reservations.controller')

// Middlewares
const {
    reservationExists,
    checkReservationIsPending,
} = require('../middlewares/reservations.middlewares')

const { roomExists } = require('../middlewares/rooms.middlewares')

const {
    paymentMethodExists,
} = require('../middlewares/paymentMethods.middlewares')

const {
    protectSession,
    protectAdmin,
} = require('../middlewares/auth.middlewares')

// Validators
const {
    createReservationValidators,
} = require('../middlewares/validators.middlewares')

const reservationsRouter = express.Router()

// Use middlewares to protect access
reservationsRouter.use(protectSession)

reservationsRouter.post(
    '/',
    createReservationValidators,
    roomExists,
    createReservation
)

reservationsRouter.patch(
    '/:id',
    reservationExists,
    checkReservationIsPending,
    paymentMethodExists,
    payReservation
)

reservationsRouter.use(protectAdmin)

reservationsRouter.get('/', getReservations)

reservationsRouter.delete('/:id', reservationExists, deleteReservationById)

module.exports = { reservationsRouter }
