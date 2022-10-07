const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// Models
const { User } = require('../models/user.model')
const { Reservation } = require('../models/reservation.model')

// Utils
const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')
const { Room } = require('../models/room.model')
const { PaymentMethod } = require('../models/paymentMethod.model')

dotenv.config()

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
        where: { status: 'active' },
        include: [],
    })

    res.status(200).json({
        status: 'success',
        data: { users },
    })
})

const createUser = catchAsync(async (req, res, next) => {
    const {
        firstName,
        lastName,
        identificationDocument,
        email,
        password,
        role,
    } = req.body

    if (role !== 'admin' && role !== 'normal') {
        return next(new AppError('Invalid role', 400))
    }

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        firstName,
        lastName,
        identificationDocument,
        email,
        password: hashedPassword,
        role,
    })

    newUser.password = undefined

    res.status(201).json({
        status: 'success',
        data: { newUser },
    })
})

const updateUser = catchAsync(async (req, res, next) => {
    const { firstName, lastName } = req.body
    const { user } = req

    await user.update({ firstName, lastName })

    res.status(200).json({
        status: 'success',
        data: { user },
    })
})

const deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req

    await user.update({ status: 'deleted' })

    res.status(204).json({ status: 'success' })
})

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({
        where: { email, status: 'active' },
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Wrong credentials', 400))
    }

    user.password = undefined

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })

    res.status(200).json({
        status: 'success',
        data: { user, token },
    })
})

const getUserSessionInfo = catchAsync(async (req, res, next) => {
    const { id } = req.sessionUser

    const user = await User.findOne({
        where: { id },
        attributes: {
            exclude: ['password', 'status', 'createdAt', 'updatedAt'],
        },
        include: {
            model: Reservation,
            attributes: [
                'id',
                'days',
                'totalPrice',
                'paymentMethodId',
                'status',
                'createdAt',
            ],
            include: [
                {
                    model: Room,
                    attributes: ['id', 'roomNumber', 'pricePerDay', 'guests'],
                },
                { model: PaymentMethod, attributes: ['id', 'name'] },
            ],
        },
    })

    res.status(200).json({
        status: 'success',
        data: { user },
    })
})

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
    getUserSessionInfo,
}
