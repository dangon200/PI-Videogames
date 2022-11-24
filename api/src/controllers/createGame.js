const { Videogame, Genre, Platform } = require('../db.js')

const createGame = async (
    name,
    description,
    image,
    releaseDate,
    rating,
    genres,
    platforms,
    review
) => {
    if (!name) throw new Error('name missing')
    if (!description) throw new Error('description missing')
    if (!platforms) throw new Error('platforms missing')

    const newGame = await Videogame.create({
        name,
        description,
        image,
        review,
        releaseDate,
        rating
    })

    if (genres.length) {
        genres.map(async genre => {
            let g = await Genre.findAll({
                where: { name: genre.toLowerCase() }
            })

            newGame.addGenre(g[0])
        })
    }

    if (platforms.length) {
        platforms.map(async platform => {
            let p = await Platform.findAll({
                where: { name: platform.toLowerCase() }
            })

            newGame.addPlatform(p[0])
        })
    }

    return newGame
}

module.exports = createGame
