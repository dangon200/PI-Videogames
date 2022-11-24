const axios = require('axios')
const { Platform } = require('../db.js')

const platforms = [
    'PC',
    'PS4',
    'PS5',
    'Xbox One',
    'Xbox Series S/X',
    'Wii',
    'Nintendo Switch'
]

const createPlatform = async platforms => {
    let platformsToDB

    platforms.forEach(async platform => {
        platformsToDB = await Platform.findOrCreate({
            where: { name: platform.toLowerCase() }
        })
    })

    return platformsToDB
}

const getPlatforms = async () => {
    // if (!apiKey) throw new Error('API KEY MISSING')
    //
    // let url = `https://api.rawg.io/api/platforms?key=${apiKey}`
    try {
        let platformsFromDB
        const platformsDB = await Platform.findAll()

        if (platformsDB.length) {
            platformsFromDB = platformsDB.map(g => {
                return {
                    id: g.dataValues.id,
                    name: g.dataValues.name
                }
            })

            return platformsFromDB
        }

        const createdPlatforms = createPlatform(platforms)
        return createdPlatforms
    } catch (error) {
        throw new Error('error in getPlatform')
    }
}

module.exports = getPlatforms
