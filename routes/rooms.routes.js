const express = require('express')

// Controllers
const {
    createRoom,
    updateRoomById,
    deleteRoomById,
} = require('../controllers/rooms.controller')

// Middlewares
const {
    roomExists,
    checkRoomNumberExist,
} = require('../middlewares/rooms.middlewares')
const { hotelExists } = require('../middlewares/hotels.middlewares')

// Validators
const { roomValidators } = require('../middlewares/validators.middlewares')

const roomsRouter = express.Router()

roomsRouter.post(
    '/:hotelId',
    hotelExists,
    roomValidators,
    checkRoomNumberExist,
    createRoom
)

roomsRouter.patch(
    '/:id',
    roomExists,
    roomValidators,
    checkRoomNumberExist,
    updateRoomById
)

roomsRouter.delete('/:id', roomExists, deleteRoomById)

module.exports = { roomsRouter }
