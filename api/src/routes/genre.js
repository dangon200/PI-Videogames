const { Router } = require('express');
const axios = require('axios');
const {Genre, apikey} = require('../db');
const router = Router();


router.get('/', async (req, res) => {
    try {
        let genreResults = null;    
        await axios.get(`https://api.rawg.io/api/genres?key=${apikey}`).then(query =>{
            genreResults = query.data.results
            genreResults = genreResults.map(value => value.name)
        })
       const genreGames = await Genre.findAll({
        attributes: ['name']
       })
       let genreDB = genreGames.map(p => p.name)        
       genreResults = genreResults.concat(genreDB);
       res.status(200).send(genreResults);
    } catch (error) {
        res.send(`Error en la ruta /genres ${error}`);
    } 
});

router.post("/:genre", async(req, res)=>{
    console.log("Llego")
    const {genre} = req.params
    try{
        const genreGames = await Genre.findAll({
            attributes: ['name']
           })
        let genreDB = genreGames.map(p => p.name)
        if(!genreDB.find(p => p == genre)){
            Genre.create({
                name: genre
            })
        }
        res.sendStatus(200)
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;