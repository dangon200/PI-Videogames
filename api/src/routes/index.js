require('dotenv').config()

const { Router } = require('express')
import {API_KEY} from './config.js'
const getGames = require('../controllers/getGames')
const searchGame = require('../controllers/searchGame')
const getGenres = require('../controllers/getGenres')
const getPlatforms = require('../controllers/getPlatforms')
const getGameById = require('../controllers/getGameById')
const createGame = require('../controllers/createGame.js')
const getGamesDB = require('../controllers/getGamesDB')
const searchGameDB = require('../controllers/searchGameDB')
const getGameByIdDB = require('../controllers/getGameByIdDB')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async (req, res) => {
    const { name } = req.query

    try {
        // TODO: limit 15 games per search
        if (name) {
            const gamesByName = await searchGame(API_KEY, name)
            const gamesByNameDB = await searchGameDB(name)
            if (gamesByName.length < 1 && gamesByNameDB.length < 1)
                return res
                    .status(404)
                    .json({ error: 'No existe el juego que buscas' })

            const results = gamesByName.concat(gamesByNameDB)
            res.json(results)
            return
        } else {
            const gamesFromAPI = await getGames(API_KEY, 120)
            const gamesFromDB = await getGamesDB()
            const allGames = gamesFromAPI.concat(gamesFromDB)
            res.json(allGames)
        }
    } catch (error) {
        res.status(404).json({ err: error.message })
    }
})

router.post('/videogames', async (req, res) => {
    const {
        name,
        description,
        image,
        releaseDate,
        rating,
        genres,
        platforms,
        review
    } = req.body

    try {
        const response = await createGame(
            name,
            description,
            image,
            releaseDate,
            rating,
            genres,
            platforms,
            review
        )
        res.status(201).json(response)
    } catch (error) {
        res.status(404).json({ err: error.message })
    }
})

router.get('/videogame/:id', async (req, res) => {
    const { id } = req.params
    const { db } = req.query

    console.log(req.query)
    try {
        if (db === 'true') {
            const game = await getGameByIdDB(id)
            res.json(game)
            return
        }
        const gameFounded = await getGameById(API_KEY, id)
        res.json(gameFounded)
    } catch (error) {
        res.status(404).json({ err: error.message })
    }
})

router.get('/genres', async (req, res) => {
    try {
        const response = await getGenres(API_KEY)
        res.json(response)
    } catch (error) {
        res.status(404).json({ err: error.message })
    }
})

router.get('/platforms', async (req, res) => {
    try {
        const response = await getPlatforms()
        res.json(response)
    } catch (error) {
        res.status(404).json({ err: error.message })
    }
})

module.exports = router
