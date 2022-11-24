const axios = require('axios')

const searchGame = async (apiKey, game) => {
    if (!apiKey || !game) throw new Error('APIKEY or ID missing')

    let url = `https://api.rawg.io/api/games?key=${apiKey}&search=${game}`

    const response = await axios.get(url)
    const gamesFound = await response.data

    // if (gamesFound.length < 1) throw new Error('No existe el juego que buscas')

    const games = gamesFound.results.map(game => {
        return {
            id: game.id,
            name: game.name,
            released: game.released,
            bg: game['background_image'],
            rating: game.rating
        }
    })

    return games
}

module.exports = searchGame
