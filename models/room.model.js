const { db, DataTypes } = require('../utils/database.util')

const Room = db.define('room', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    hotelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    pricePerDay: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    guests: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'available',
    },
})

module.exports = { Room }
