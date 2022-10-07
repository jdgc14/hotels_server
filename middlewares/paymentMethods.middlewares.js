// Models
const { PaymentMethod } = require('../models/paymentMethod.model')

// Utils
const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const paymentMethodExists = catchAsync(async (req, res, next) => {
    const id = req.params.id || req.body.paymentMethodId

    const paymentMethod = await PaymentMethod.findOne({
        where: { id },
    })

    if (!paymentMethod) {
        return next(new AppError('Payment Method not found', 404))
    }

    req.paymentMethod = paymentMethod
    next()
})

module.exports = {
    paymentMethodExists,
}