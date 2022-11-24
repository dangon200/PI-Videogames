const axios = require('axios')

const getGameById = async (apiKey, id) => {
    if (!apiKey || !id) throw new Error('APIKEY or ID missing')

    // TODO: CHECK ID IN DATABASE
    try {
        let url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`

        const response = await axios.get(url)

        return {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            released: response.data.released,
            rating: response.data.rating,
            bg: response.data['background_image'],
            genres: response.data['genres'].map(g => {
                return { id: g.id, name: g.name }
            }),
            platforms: response.data['platforms'].map(p => {
                return { id: p.platform.id, name: p.platform.name }
            })
        }
    } catch (error) {
        throw new Error('error in getGameById')
    }
}

module.exports = getGameById
