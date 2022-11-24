//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js')
require('dotenv').config()
const getGenres = require('./src/controllers/getGenres.js')
const getPlatforms = require('./src/controllers/getPlatforms.js')
const { conn } = require('./src/db.js')
import {PORT, API_KEY} from './config.js'

// Syncing all the models at once.
async function main() {
    try {
        conn.sync({}).then(() => {
            server.listen(PORT, () => {
                console.log(`%s listening at ${PORT}`) // eslint-disable-line no-console
            })
        })
        await getGenres(API_KEY)
        await getPlatforms(API_KEY)
    } catch (error) {
        console.error('unable to connect', error)
    }
}

main()
