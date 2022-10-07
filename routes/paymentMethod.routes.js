const express = require('express')

// Controllers
const {
    createPaymentMethod,
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

module.exports = { paymentMethodsRouter }
