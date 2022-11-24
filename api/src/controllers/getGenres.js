const axios = require('axios')
const { Genre } = require('../db.js')

const createGenres = async genres => {
    let genresFromApi

    genres.forEach(async genre => {
        genresFromApi = await Genre.findOrCreate({
            where: { name: genre.toLowerCase() }
        })
    })

    return genresFromApi
}

const getGenres = async apiKey => {
    if (!apiKey) throw new Error('API KEY MISSING')

    let url = `https://api.rawg.io/api/genres?key=${apiKey}`

    try {
        let genres = []
        let genresFromDB

        const genresDB = await Genre.findAll()

        if (genresDB) {
            genresFromDB = genresDB.map(g => {
                return {
                    id: g.dataValues.id,
                    name: g.dataValues.name
                }
            })
        }

        const response = await axios.get(url)

        response.data.results.forEach(genre => {
            genres.push(genre.name.toLowerCase())
        })

        if (genresFromDB.length > 0 && genres.length === genresFromDB.length) {
            return genresFromDB
        } else {
            genres = createGenres(genres.sort())
            return genres
        }
    } catch (error) {
        throw new Error('error in getGenres')
    }
}

module.exports = getGenres
