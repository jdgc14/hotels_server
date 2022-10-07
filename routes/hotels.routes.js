const express = require('express')

// Controllers
const {
    createHotel,
    getActiveHotels,
    updateHotelById,
    deleteHotelById,
} = require('../controllers/hotels.controller')

// Routers
const { roomsRouter } = require('./rooms.routes')

// Middlewares
const { hotelExists } = require('../middlewares/hotels.middlewares')
const {
    protectSession,
    protectAdmin,
} = require('../middlewares/auth.middlewares')

// Validators
const { hotelValidators } = require('../middlewares/validators.middlewares')

const hotelsRouter = express.Router()

hotelsRouter.get('/', getActiveHotels)

// Use middlewares to protect access
hotelsRouter.use(protectSession)
hotelsRouter.use(protectAdmin)

hotelsRouter.post('/', hotelValidators, createHotel)

hotelsRouter.patch('/:id', hotelExists, hotelValidators, updateHotelById)

hotelsRouter.delete('/:id', hotelExists, deleteHotelById)

// Use roomsRouter
hotelsRouter.use('/rooms', roomsRouter)

module.exports = { hotelsRouter }
