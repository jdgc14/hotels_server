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

module.exports = {
    hotelExists,
}
