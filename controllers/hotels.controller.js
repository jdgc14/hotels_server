// Models
const { Hotel } = require('../models/hotel.model')
const { Room } = require('../models/room.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')

const createHotel = catchAsync(async (req, res, next) => {
    const { name, address, stars } = req.body

    const newHotel = await Hotel.create({
        name,
        address,
        stars,
    })

    res.status(201).json({
        status: 'success',
        data: { newHotel },
    })
})

const getActiveHotels = catchAsync(async (req, res, next) => {
    const hotels = await Hotel.findAll({
        where: { status: 'active' },
        attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
        include: {
            model: Room,
            // required: false,
            // where: { status: 'available' },
            attributes: { exclude: ['hotelId', 'createdAt', 'updatedAt'] },
        },
    })

    res.status(200).json({
        status: 'success',
        data: { hotels },
    })
})

const getHotelById = catchAsync(async (req, res, next) => {
    const { id } = req.hotel

    const hotel = await Hotel.findOne({
        where: { id },
        attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
        include: {
            model: Room,
            attributes: { exclude: ['hotelId', 'createdAt', 'updatedAt'] },
        },
    })

    res.status(200).json({
        status: 'success',
        data: { hotel },
    })
})

const updateHotelById = catchAsync(async (req, res, next) => {
    const { name, address, stars } = req.body

    const { hotel } = req

    await hotel.update({
        name,
        address,
        stars,
    })

    res.status(200).json({
        status: 'success',
        data: { hotel },
    })
})

const deleteHotelById = catchAsync(async (req, res, next) => {
    const { hotel } = req

    await hotel.update({ status: 'deleted' })

    res.status(204).json({
        status: 'success',
        data: { hotel },
    })
})

module.exports = {
    createHotel,
    getActiveHotels,
    getHotelById,
    updateHotelById,
    deleteHotelById,
}
