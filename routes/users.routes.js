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

usersRouter.post('/singup', createUserValidators, createUser)

usersRouter.post('/login', loginValidators, login)

usersRouter.use(protectSession)

usersRouter.get('/me', getUserSessionInfo)

usersRouter.get('/', protectAdmin, getAllUsers)

usersRouter.patch(
    '/:id',
    userExists,
    updateUserValidators,
    protectUsersAccount,
    updateUser
)

usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser)

module.exports = { usersRouter }
