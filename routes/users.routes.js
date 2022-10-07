const express = require('express')

// Controllers
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
    getUserSessionInfo,
} = require('../controllers/users.controller')

// Middlewares
const { userExists } = require('../middlewares/users.middlewares')
const {
    protectSession,
    protectUsersAccount,
    protectAdmin,
} = require('../middlewares/auth.middlewares')

// Validators
const {
    createUserValidators,
    updateUserValidators,
    loginValidators,
} = require('../middlewares/validators.middlewares')

const usersRouter = express.Router()

// Unprotected routes
usersRouter.post('/singup', createUserValidators, createUser)

usersRouter.post('/login', loginValidators, login)

// Use middlewares to protect access
usersRouter.use(protectSession)

// Protected routes
usersRouter.get('/me', getUserSessionInfo)

usersRouter.patch(
    '/:id',
    userExists,
    updateUserValidators,
    protectUsersAccount,
    updateUser
)

usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser)

// Protected admin routes
usersRouter.get('/', protectAdmin, getAllUsers)

module.exports = { usersRouter }
