// Models
const { Reservation } = require('../models/reservation.model')

// Utils
const { Op } = require('../utils/database.util')
const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const reservationExists = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const reservation = await Reservation.findOne({
        where: { id, status: { [Op.not]: 'deleted' } },
    })

    if (!reservation) {
        return next(new AppError('reservation not found', 404))
    }

    req.reservation = reservation
    next()
})

const checkReservationIsPending = (req, res, next) => {
    const { reservation } = req

    if (reservation.status === 'pending') {
        return next()
    }

    return next(new AppError('reservation does not pending', 404))
}

module.exports = {
    reservationExists,
    checkReservationIsPending,
}
