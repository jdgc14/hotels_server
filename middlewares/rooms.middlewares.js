// Models
const { Room } = require('../models/room.model')

// Utils
const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const roomExists = catchAsync(async (req, res, next) => {
    const id = req.params.id || req.body.roomId

    const room = await Room.findOne({
        where: { id },
    })

    if (!room) {
        return next(new AppError('room not found', 404))
    }

    req.room = room
    next()
})

// Check if the roomNumber is not being used
const checkRoomNumberExist = catchAsync(async (req, res, next) => {
    const { roomNumber } = req.body

    const room = await Room.findOne({
        where: { roomNumber },
    })

    if (!room) {
        return next()
    }
    return next(new AppError('roomNumber already exists', 400))
})

// To validate if room is available to reserve
const roomIsAvailable = catchAsync(async (req, res, next) => {
    const { room } = req

    if (room.status === 'available') {
        return next()
    }

    return next(new AppError('room not available', 400))
})

module.exports = {
    roomExists,
    checkRoomNumberExist,
    roomIsAvailable,
}
