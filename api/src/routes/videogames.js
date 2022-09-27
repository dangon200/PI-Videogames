var express = require('express');
const {apikey, Videogame, conn, Genre, } = require('../db');
const axios = require('axios');
var router = express.Router();

router.post('/', async (req, res) => {  
    let { name, description, reldate, rating, platforms, genre} = req.body;
    platforms = platforms.toString();
    let max_id = await Videogame.max("web_id");
    if(max_id){
        max_id++
    }
    else {
        max_id = 1000001
    }

    const addVgame = await Videogame.create({
       web_id: max_id,
       name,
       description,
       reldate,
       rating, 
       platforms
    })
   const vg_genre = await Genre.findAll({
       where:{name : genre}
   })
   addVgame.addGenre(vg_genre)

    res.send('Nuevo videojuego creado')
  });

router.get('/:id', async (req, res) => {  
const {id} = req.params;
try {    
    if (!isNaN(id)){
        var searchDB  = await Videogame.findByPk(id, {
            include: [{
                model: Genre,
                attributes: ['name'],
                through: {
                attributes: []
                }
            }]
        });
        
        if (searchDB) {
            let genreName=[]
            console.log(searchDB)
            for (let i=0;i<searchDB.genres.length;i++) {
                genreName.push(searchDB.genres[i].name)
            }
            const gameDB = {
            name: searchDB.name,
            platforms: searchDB.platforms,
            released: searchDB.reldate, 
            image: "https://media.rawg.io/media/games/157/15742f2f67eacff546738e1ab5c19d20.jpg",
            description: searchDB.description,
            rating: searchDB.rating,
            genres: genreName.toString()
            }
            return res.status(200).json(gameDB)
        }  

        var idkey = parseInt(id)
        const result = await axios.get(`https://api.rawg.io/api/games/${idkey}?key=${apikey}`)
        if (result.data.id) {
        let genreName=[]
        for (i=0;i<result.data.genres.length;i++) {
            genreName.push(result.data.genres[i].name)
        } 
        let platformName=[]
        for (i=0;i<result.data.platforms.length;i++) {
            platformName.push(result.data.platforms[i].platform.name)
        } 
        const searchApi = {
            name: result.data.name,
            platforms: platformName.toString(),
            released: result.data.released, 
            image: result.data.background_image,
            description: result.data.description.replace(/<[^>]+>/g, ''),
            rating: result.data.rating,
            genres: genreName.toString()
        }
        return res.status(200).json(searchApi)
        }
    }

    return res.status(404).send('Videojuego no encontrado');
} catch (error) {
    res.send(`Error en la ruta /videogames:id ${error}`);
}
});

router.get('/', async (req, res) => {  
const {name} = req.query;
try { 
    if (name) {
        let searchName = name.split(' ').join('-').toLowerCase()
        var resApi = await axios.get(`https://api.rawg.io/api/games?search=${searchName}&key=${apikey}&page_size=100`)
        resApi = resApi.data.results
    } else {
        async function findInApi () {
            try { 
                const p1 = axios.get(`https://api.rawg.io/api/games?key=${apikey}&page=1&page_size=50`);
                const p2 = axios.get(`https://api.rawg.io/api/games?key=${apikey}&page=2&page_size=50`);
                const p3 = axios.get(`https://api.rawg.io/api/games?key=${apikey}&page=3&page_size=50`);

                await Promise.all([p1, p2, p3])
                .then(function(values) {
                    resApi = values[0].data.results.concat(values[1].data.results).concat(values[2].data.results)
                })
            } catch (err) {
                console.log('Error buscando en la API: ', err)
            }
        }
        await findInApi()
        }    
        if (resApi.length > 0) {  
        var gamesFA = resApi.map(p => {
            let b=[]
            for (i=0;i<p.genres.length;i++) {
                b.push(p.genres[i].name)
            }
            return {
            id:p.id,
            name: p.name,
            image: p.background_image,
            genres: b.toString(),
            rating: p.rating,
            origin: 'API'
            }
        })  
        if (name) {
        gamesFA = gamesFA.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))     
        }      
    } else var gamesFA = []


    var gamesDB = []
    gamesDB = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {attributes: [] }
        }  
    })  
    if (name) {
        gamesDB = gamesDB.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))     
    }
    var gamesDB = gamesDB.map(p => {
        let b=[]
        for (i=0;i<p.genres.length;i++) {
            b.push(p.genres[i].name)
        }
        return {
            id: p.web_id,
            name: p.name,
            image: "https://media.rawg.io/media/games/157/15742f2f67eacff546738e1ab5c19d20.jpg",
            genres: b.toString(),
            rating: p.rating,
            origin: 'DB'
        }
    })           

    const listedGames = gamesDB.concat(gamesFA)
    res.json(listedGames.length ? listedGames : 'No videogames found');
} catch (error) {
    res.send(`Error en la ruta /videogames ${error}`);
}
});

  router.post('/delete/:name', async (req, res) => {
  const { name } = req.params;
  console.log('Borrar juego: ', name)
  try {
   const elem = await Videogame.destroy({
      where: {name: `${name}`}
   });
  } catch (error) {
      res.send(`Error en la ruta /videogames/delete ${error}`);
  }
  res.send('Videogame has been deleted');
});


  module.exports = router;