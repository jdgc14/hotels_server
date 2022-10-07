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

const updatePaymentMethodById = catchAsync(async (req, res, next) => {
    const { name } = req.body

    const { paymentMethod } = req

    await paymentMethod.update({ name })

    res.status(200).json({
        status: 'success',
        data: { paymentMethod },
    })
})

const deletePaymentMethodById = catchAsync(async (req, res, next) => {
    const { paymentMethod } = req

    await paymentMethod.update({ status: 'deleted' })

    res.status(204).json({
        status: 'success',
        data: { paymentMethod },
    })
})

module.exports = {
    createPaymentMethod,
    updatePaymentMethodById,
    deletePaymentMethodById,
}
