// Models
const { Room } = require('../models/room.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')

const createRoom = catchAsync(async (req, res, next) => {
    const { roomNumber, pricePerDay, guests } = req.body
    const { hotelId } = req.params

    const newRoom = await Room.create({
        hotelId,
        roomNumber,
        pricePerDay,
        guests,
    })

    res.status(201).json({
        status: 'success',
        data: { newRoom },
    })
})

const updateRoomById = catchAsync(async (req, res, next) => {
    const { roomNumber, pricePerDay, guests } = req.body
    const { room } = req

    await room.update({
        roomNumber,
        pricePerDay,
        guests,
    })

    res.status(200).json({
        status: 'success',
        data: { room },
    })
})

const deleteRoomById = catchAsync(async (req, res, next) => {
    const { room } = req

    await room.update({
        status: 'deleted',
    })

    res.status(204).json({
        status: 'success',
        data: { room },
    })
})

module.exports = { createRoom, updateRoomById, deleteRoomById }
