const { body, validationResult } = require('express-validator')

// Utils
const { AppError } = require('../utils/appError.util')

const checkValidations = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg)

        const message = errorMessages.join('. ')

        return next(new AppError(message, 400))
    }

    next()
}

const createUserValidators = [
    body('firstName')
        .isString()
        .withMessage('firstName must be a string')
        .isLength({ min: 3 })
        .withMessage('firstName must be at least 3 characters'),
    body('lastName')
        .isString()
        .withMessage('lastName must be a string')
        .isLength({ min: 3 })
        .withMessage('lastName must be at least 3 characters'),
    body('identificationDocument')
        .isNumeric()
        .withMessage('Must provide a identificationDocument')
        .isLength({ min: 6, max: 12 })
        .withMessage(
            'identificationDocument must be at min 6 digits and max 12 digits'
        ),
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('password must be a string')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters'),
    checkValidations,
]

const updateUserValidators = [
    body('firstName')
        .isString()
        .withMessage('firstName must be a string')
        .isLength({ min: 3 })
        .withMessage('firstName must be at least 3 characters'),
    body('lastName')
        .isString()
        .withMessage('lastName must be a string')
        .isLength({ min: 3 })
        .withMessage('lastName must be at least 3 characters'),
    checkValidations,
]

const loginValidators = [
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('password must be a string')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters'),
    checkValidations,
]

const hotelValidators = [
    body('name')
        .isString()
        .withMessage('name must be a string')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    body('address')
        .isString()
        .withMessage('address must be a string')
        .isLength({ min: 10 })
        .withMessage('address must be at least 10 characters'),
    body('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage('stars must be a integer from 1 to 5'),
    checkValidations,
]

const roomValidators = [
    body('roomNumber')
        .isInt({ min: 1 })
        .withMessage('roomNumber must be a integer'),
    body('pricePerDay')
        .isNumeric({ min: 0.1 })
        .withMessage('pricePerDay must be a number'),
    body('guests')
        .isInt({ min: 1, max: 6 })
        .withMessage('guests must be a integer from 1 to 6'),

    checkValidations,
]

const createReservationValidators = [
    body('roomId').isInt({ min: 1 }).withMessage('roomId must be a integer'),
    body('days').isInt({ min: 1 }).withMessage('days must be a integer'),
    checkValidations,
]

const payReservationValidators = [
    body('paymentMethodId')
        .isInt({ min: 1 })
        .withMessage('paymentMethodId must be a integer'),
    checkValidations,
]

const paymentMethodValidators = [
    body('name')
        .isString()
        .withMessage('name must be a string')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    checkValidations,
]

module.exports = {
    createUserValidators,
    updateUserValidators,
    loginValidators,
    hotelValidators,
    roomValidators,
    createReservationValidators,
    payReservationValidators,
    paymentMethodValidators,
}
