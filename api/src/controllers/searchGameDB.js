const { Videogame } = require('../db.js')

const searchGameDB = async name => {
    const gamesFromDB = await Videogame.findAll({
        where: {
            name: name
        }
    })

    const games = gamesFromDB.map(game => {
        return {
            id: game.id,
            name: game.name,
            released: game.releaseDate
        }
    })

    return games
}

module.exports = searchGameDB
