import {
    CLEAR_FILTER,
    CREATE_GAME,
    FILTER_BY_AZ,
    FILTER_BY_GENRE,
    FILTER_BY_RATING,
    FILTER_BY_SOURCE,
    GET_ALL_GAMES,
    GET_GAME_DETAIL,
    GET_GENRES,
    GET_PLATFORMS,
    SEARCH_GAME
} from '../actions/index'

const initialState = {
    games: [],
    gamesSorted: [],
    genres: [],
    platforms: [],
    gameDetail: [],
    error: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                games: action.payload
            }
        case GET_GAME_DETAIL:
            return {
                ...state,
                gameDetail: action.payload
            }
        case CREATE_GAME:
            return {
                ...state,
                games: [...state.games, action.payload]
            }
        case GET_GENRES:
            return {
                ...state,
                genres: [...action.payload]
            }
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: [...action.payload]
            }
        case SEARCH_GAME:
            state.error = []
            if (action.payload.hasOwnProperty('error'))
                return {
                    ...state,
                    error: [...state.error, action.payload.error]
                }

            return {
                ...state,
                gamesSorted: action.payload
            }
        case FILTER_BY_AZ:
            return {
                ...state,
                gamesSorted: action.payload
            }
        case FILTER_BY_RATING:
            return {
                ...state,
                gamesSorted: [...action.payload]
            }
        case FILTER_BY_GENRE:
            state.error = []
            if (action.payload.length === 0)
                return {
                    ...state,
                    error: [
                        ...state.error,
                        'No hay juegos con el género que buscas'
                    ]
                }
            return {
                ...state,
                gamesSorted: [...action.payload]
            }
        case FILTER_BY_SOURCE:
            return {
                ...state,
                gamesSorted: [...action.payload]
            }
        case CLEAR_FILTER:
            return {
                ...state,
                games: action.payload,
                gamesSorted: [],
                error: {}
            }
        default:
            return state
    }
}
export default rootReducer
