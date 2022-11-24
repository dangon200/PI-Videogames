const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
    // defino el modelo
    sequelize.define(
        'videogame',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING
            },
            review: {
                type: DataTypes.STRING
            },
            releaseDate: {
                type: DataTypes.DATEONLY
            },
            rating: {
                type: DataTypes.INTEGER
            },
            createdByUser: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false
            }
        },
        { timestamps: false }
    )
}
