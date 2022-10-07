// Models
const { PaymentMethod } = require('../models/paymentMethod.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')

const createPaymentMethod = catchAsync(async (req, res, next) => {
    const { name } = req.body

    const newPaymentMethod = await PaymentMethod.create({ name })

    res.status(201).json({
        status: 'success',
        data: { newPaymentMethod },
    })
})

module.exports = { createPaymentMethod }
