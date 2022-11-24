const { Videogame, conn } = require('../../src/db.js')
const { expect } = require('chai')

describe('Videogame model', () => {
    before(() =>
        conn.authenticate().catch(err => {
            console.error('Unable to connect to the database:', err)
        })
    )
    describe('Validators', () => {
        beforeEach(() => Videogame.sync({ force: true }))
        describe('name', () => {
            it('should throw an error if name is null', done => {
                Videogame.create({})
                    .then(() => done(new Error('name missing')))
                    .catch(() => done())
            })
            it('should throw anr error if description is null', done => {
                Videogame.create({
                    name: 'Super Mario Bros',
                    platforms: 'Nintendo'
                })
                    .then(() => done(new Error('description missing')))
                    .catch(() => done())
            })
            it('should throw anr error if platforms is null', done => {
                Videogame.create({
                    name: 'Super Mario Bros',
                    description: 'Arcade Game'
                })
                    .then(() => done(new Error('platforms missing')))
                    .catch(() => done())
            })
            it('should work when its a valid data', done => {
                Videogame.create({
                    name: 'Super Mario Bros',
                    description: 'Arcade Game',
                    platforms: 'Nintendo'
                })
                    .then(() => done())
                    .catch(() => done())
            })
        })
    })
})
