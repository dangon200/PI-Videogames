import axios from 'axios'

export const GET_ALL_GAMES = 'GET_ALL_GAMES'
export const GET_GAME_DETAIL = 'GET_GAME_DETAIL'
export const GET_GENRES = 'GET_GENRES'
export const GET_PLATFORMS = 'GET_PLATFORMS'
export const SEARCH_GAME = 'SEARCH_GAME'
export const FILTER_BY_AZ = 'FILTER_BY_AZ'
export const FILTER_BY_RATING = 'FILTER_BY_RATING'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const FILTER_BY_SOURCE = 'FILTER BY SOURCE'
export const CREATE_GAME = 'CREATE_GAME'
export const CLEAR_FILTER = 'CLEAR_FILTER'
export const TOGGLE_LOADING = 'TOGGLE_LOADING'

export const getAllGames = () => {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/videogames')

        return dispatch({
            type: GET_ALL_GAMES,
            payload: response.data
        })
    }
}

export const getGameById = (id, createdByUser) => {
    return async function (dispatch) {
        const response = await axios.get(
            `http://localhost:3001/videogame/${id}?db=${createdByUser}`
        )

        return dispatch({
            type: GET_GAME_DETAIL,
            payload: response.data
        })
    }
}

export const createGame = data => {
    return async function (dispatch) {
        const response = await axios.post(
            'http://localhost:3001/videogames',
            data
        )
        return dispatch({
            type: CREATE_GAME,
            payload: response.data
        })
    }
}

export const getGenres = () => {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/genres')

        return dispatch({
            type: GET_GENRES,
            payload: response.data
        })
    }
}

export const getPlatforms = () => {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/platforms')

        return dispatch({
            type: GET_PLATFORMS,
            payload: response.data
        })
    }
}

export const searchGame = name => {
    return async function (dispatch) {
        try {
            const response = await axios.get(
                `http://localhost:3001/videogames?name=${name}`,
                { validateStatus: false }
            )

            return dispatch({
                type: SEARCH_GAME,
                payload: response.data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const filterGamesByName = (sort, games) => {
    return function (dispatch) {
        let sortedGames = [...games]
        sortedGames = sortedGames.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase())
                return sort === 'AZ' ? -1 : 1
            if (a.name.toLowerCase() > b.name.toLowerCase())
                return sort === 'AZ' ? 1 : -1
            return 0
        })

        return dispatch({
            type: FILTER_BY_AZ,
            payload: sortedGames
        })
    }
}

export const filterGamesByRating = (sort, games) => {
    return function (dispatch) {
        let sortedGames = [...games]
        sortedGames = sortedGames.sort((a, b) => {
            if (a.rating < b.rating) return sort === 'ratingAsc' ? -1 : 1
            if (a.rating > b.rating) return sort === 'ratingAsc' ? 1 : -1
            return 0
        })

        return dispatch({
            type: FILTER_BY_RATING,
            payload: sortedGames
        })
    }
}

export const filterGamesByGenres = (genre, games) => {
    return function (dispatch) {
        const sortedGames = games.filter(game => {
            return game.genres?.find(g => g.name.toLowerCase() === genre)
        })

        return dispatch({
            type: FILTER_BY_GENRE,
            payload: sortedGames
        })
    }
}

export const filterGamesBySource = (source, games) => {
    return function (dispatch) {
        let sortedGames
        if (source !== 'API') {
            sortedGames = games.filter(g => g.createdByUser)
        }
        if (source === 'API') {
            sortedGames = games.filter(g => !g.createdByUser)
        }
        if (source === 'none') {
            sortedGames = []
        }
        return dispatch({
            type: FILTER_BY_SOURCE,
            payload: sortedGames
        })
    }
}

export const clearFilters = games => {
    return {
        type: CLEAR_FILTER,
        payload: games
    }
}
