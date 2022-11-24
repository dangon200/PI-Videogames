const axios = require('axios')

const getGames = async (apiKey, amount) => {
    if (!apiKey) throw new Error('APIKEY missing')

    try {
        let games = []
        let url = `https://api.rawg.io/api/games?key=${apiKey}`
        let gamesRequested = Math.round(amount / 20)

        // TODO: REFACTOR
        for (let index = 0; index < gamesRequested; index++) {
            let response = await axios.get(url)

            response.data.results.forEach(game => {
                games.push({
                    id: game['id'],
                    name: game['name'],
                    released: game['released'],
                    bg: game['background_image'],
                    rating: game['rating'],
                    genres: game['genres'].map(g => {
                        return { id: g.id, name: g.name }
                    }),
                    platforms: game['platforms'].map(p => {
                        return { id: p.platform.id, name: p.platform.name }
                    })
                })
            })

            url = response.data.next
        }
        return games
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = getGames
