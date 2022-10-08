// Models
const { Hotel } = require('../models/hotel.model')

// Utils
const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const hotelExists = catchAsync(async (req, res, next) => {
    const id = req.params.id || req.params.hotelId

    const hotel = await Hotel.findOne({
        where: { id },
    })

    if (!hotel) {
        return next(new AppError('Hotel not found', 404))
    }

    req.hotel = hotel
    next()
})

const disableAllRooms = catchAsync(async (rooms) => {
    const roomsPromises = rooms.map(async (room) => {
        await room.update({ status: 'deleted' })
    })

    Promise.all(roomsPromises)
})

module.exports = {
    hotelExists,
    disableAllRooms,
}
