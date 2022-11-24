const { Videogame, Genre, Platform } = require('../db.js')

const getGameByIdDB = async id => {
    const gameFounded = await Videogame.findByPk(id, {
        include: [Genre, Platform]
    })

    if (!gameFounded) throw new Error('Game not founded')

    return gameFounded
}

module.exports = getGameByIdDB
