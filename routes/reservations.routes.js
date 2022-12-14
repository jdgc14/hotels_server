const express = require('express')

// Controllers
const {
    createReservation,
    payReservation,
    finishedReservation,
    getReservations,
    deleteReservationById,
} = require('../controllers/reservations.controller')

// Middlewares
const {
    reservationExists,
    checkReservationIsPending,
} = require('../middlewares/reservations.middlewares')

const {
    roomExists,
    roomIsAvailable,
} = require('../middlewares/rooms.middlewares')

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
    payReservationValidators,
} = require('../middlewares/validators.middlewares')

const reservationsRouter = express.Router()

// Use middlewares to protect access
reservationsRouter.use(protectSession)

// Protected routes
reservationsRouter.post(
    '/',
    createReservationValidators,
    roomExists,
    roomIsAvailable,
    createReservation
)

reservationsRouter.post(
    '/:id',
    reservationExists,
    checkReservationIsPending,
    payReservationValidators,
    paymentMethodExists,
    payReservation
)

// Protected admin routes
reservationsRouter.use(protectAdmin)

reservationsRouter.get('/', getReservations)

reservationsRouter.patch('/:id', reservationExists, finishedReservation)

reservationsRouter.delete('/:id', reservationExists, deleteReservationById)

module.exports = { reservationsRouter }
