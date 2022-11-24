const { Videogame, Genre, Platform } = require('../db.js')

const getGamesDB = async () => {
    const gamesFromDB = await Videogame.findAll({
        include: [Genre, Platform]
    })

    const games = gamesFromDB.map(game => {
        return {
            id: game.id,
            name: game.name,
            description: game.description,
            released: game.releaseDate,
            rating: game.rating,
            image: game.image,
            genres: game.genres.map(g => {
                return { id: g.id, name: g.name }
            }),
            platforms: game.platforms.map(p => {
                return { id: p.id, name: p.name }
            }),
            createdByUser: game.createdByUser
        }
    })

    return games
}

module.exports = getGamesDB
