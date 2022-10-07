// Models
const { Reservation } = require('../models/reservation.model')
const { Room } = require('../models/room.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')

const createReservation = catchAsync(async (req, res, next) => {
    const { room } = req
    const { id, identificationDocument } = req.sessionUser
    const { roomId, days } = req.body

    const totalPrice = days * room.pricePerDay

    const newReservation = await Reservation.create({
        userId: id,
        userIdentificationDocument: identificationDocument,
        roomId,
        days,
        totalPrice,
    })

    await room.update({
        status: 'unavailable',
    })

    res.status(201).json({
        status: 'success',
        data: { newReservation },
    })
})

const payReservation = catchAsync(async (req, res, next) => {
    const { reservation } = req

    const { paymentMethodId } = req.body

    await reservation.update({ paymentMethodId, status: 'paid' })

    res.status(200).json({
        status: 'success',
        data: { reservation },
    })
})

const getReservations = catchAsync(async (req, res, next) => {
    const reservations = await Reservation.findAll()

    res.status(200).json({
        status: 'success',
        data: { reservations },
    })
})

const deleteReservationById = catchAsync(async (req, res, next) => {
    const { reservation } = req

    await reservation.update({ status: 'deleted' })

    const room = await Room.findOne({ where: { id: reservation.roomId } })

    await room.update({ status: 'available' })

    res.status(204).json({
        status: 'success',
        data: { reservation },
    })
})

const finishedReservation = catchAsync(async (req, res, next) => {
    const { reservation } = req

    await reservation.update({ status: 'finished' })

    const room = await Room.findOne({ where: { id: reservation.roomId } })

    await room.update({ status: 'available' })

    res.status(200).json({
        status: 'success',
        data: { reservation },
    })
})

module.exports = {
    createReservation,
    payReservation,
    getReservations,
    deleteReservationById,
    finishedReservation,
}
