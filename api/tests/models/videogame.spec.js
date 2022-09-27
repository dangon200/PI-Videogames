const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Imposible conectar a la database:', err);
    }));
  describe('Validador', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('Debe arrojar un error si el nombre es nulo', (done) => {
        Videogame.create({})
          .then(() => done(new Error('Deberia tener un nombre valido')))
          .catch(() => done());
      });
      it('Deberia tener un nombre valido', () => {
        Recipe.create({ name: 'Super Mario Bros' });
      });
    });
  });
});

