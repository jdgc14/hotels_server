// Models
const { User } = require('./user.model')
const { Room } = require('./room.model')
const { Hotel } = require('./hotel.model')
const { Reservation } = require('./reservation.model')

const initModels = () => {
    // 1 Hotel <---> M Room
    Hotel.hasMany(Room, { foreignKey: 'hotelId' })
    Room.belongsTo(Hotel)

    // 1 Room <---> 1 Reservation
    Room.hasOne(Reservation, { foreignKey: 'roomId' })
    Reservation.belongsTo(Room)

    // 1 User <---> M Reservation
    User.hasMany(Reservation, { foreignKey: 'userId' })
    Reservation.belongsTo(User)
}

module.exports = { initModels }
