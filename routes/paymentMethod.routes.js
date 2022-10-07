const express = require('express')

// Controllers
const {
    createPaymentMethod,
    updatePaymentMethodById,
    deletePaymentMethodById,
} = require('../controllers/paymentMethods.controller')

// Middlewares
const {
    paymentMethodExists,
} = require('../middlewares/paymentMethods.middlewares')

const {
    protectSession,
    protectAdmin,
} = require('../middlewares/auth.middlewares')

// Validators
const {
    paymentMethodValidators,
} = require('../middlewares/validators.middlewares')

const paymentMethodsRouter = express.Router()

// Use middlewares to protect access
paymentMethodsRouter.use(protectSession)
paymentMethodsRouter.use(protectAdmin)

paymentMethodsRouter.post('/', paymentMethodValidators, createPaymentMethod)

paymentMethodsRouter.patch(
    '/:paymentMethodId',
    paymentMethodExists,
    paymentMethodValidators,
    updatePaymentMethodById
)

paymentMethodsRouter.delete(
    '/:paymentMethodId',
    paymentMethodExists,
    deletePaymentMethodById
)

module.exports = { paymentMethodsRouter }
