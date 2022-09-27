import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import postvgame from '../../redux/actions/postvgame';
import getvgames from '../../redux/actions/getvideogames';
import  stl from './AddVideogame.module.css';
import axios from 'axios';

function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Name is required' 
    } else if (!input.rating || input.rating<0 || input.rating >5) {
        errors.rating = 'Rating must be a nummber between 0-5'
    } else if (input.platforms.length===0) {
        errors.platform = 'Platforms is required'
    }
    return errors 
}

export default function AddVideogame() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [input,setInput] = useState({
        name: '',
        description: '',
        reldate: '',
        rating:'',
        platforms: [],
        genre: []
    })
    const [errors,setErrors] =  useState({})
    let allgenres = useSelector((state) => state.genres)  
    const allplatforms = useSelector((state) => state.platforms)
    allgenres = allgenres.filter(p => p !== 'All')

    function handleOnChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        })
        setErrors(validate ({
            ...input,[e.target.name]:e.target.value
        }))
     }
     
     function handlePlatforms(e) {
         console.log('Platform: ',e.target.value)
        setInput({
          ...input,
          platforms: [...input.platforms,e.target.value]
        })
     } 

     function handleGenres(e) {
        setInput({
          ...input,
          genre: [...input.genre,e.target.value]
        })
     } 
    
      function  handleSubmit(e) {
         e.preventDefault()
         if (!input.name) {return alert('Debe seleccionar un nombre')}
         if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(input.reldate)) 
            {return alert('Fecha de lanzamiento debe tener el siguiente formato YYYY-MM-DD o YYYY-M-D')}
         if (!input.rating) {return alert('Se requiere un puntaje')}
         if (!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating) || 
            input.rating <0 || input.rating >5) 
            {return alert('El puntaje debe ser un numero del 0 al 5')
         }
         if (input.platforms.length===0) {return alert('Debe seleccionar al menos una plataforma')}
         input.genre.forEach(async (g)=>{
            await axios.post("http://localhost:3001/genres/"+g)
         })
         dispatch(postvgame(input))
         dispatch(getvgames())
         alert(`El videojuego ${input.name} fue creado exitosamente`)
         setInput({
            name: '',
            description: '',
            reldate: '',
            rating:0,
            platforms: [],
            genre: []
         })
         history.push('/home')
      }

    return (
        <>
        <div  className={stl.avgwrapper}>
        <h1 className={stl.h1}>Agrega tu propio Videojuego</h1>
            <form className={stl.formarea} onSubmit={handleSubmit}>
           
                <div className={stl.msgarea}>
                    <label>Descripción:</label>
                    <textarea onChange={handleOnChange} type='text' name='description' value={input.description} />
                </div>
                <div className={stl.detailsarea}>
                    <label>Nombre del Juego:</label>
                    <input onChange={handleOnChange} onBlur={handleOnChange} 
                        type='text' name='name' value={input.name}/>
                    {errors.name && ( <p className={stl.error}> {errors.name} </p> )}

                    <label>Fecha de Lanzamiento:</label>
                    <input onChange={handleOnChange} type='text' name='reldate' value={input.reldate} 
                             placeholder='YYYY-MM-DD'/>

                    <label>Puntaje:</label>
                    <input onChange={handleOnChange} onBlur={handleOnChange}
                        type='text' name='rating' value={input.rating} placeholder='ejm 4.3'/>
                    {errors.rating && ( <p className={stl.error}> {errors.rating} </p> )}     

                    <label>Plataforma:</label>   
                    <select onChange={handlePlatforms}  onBlur={handleOnChange}>
                        {allplatforms.sort().map(p => {
                           return  <option value={p}>{p}</option>
                        })}
                    </select>
                    <ul  className='ul'><li>{input.platforms.map(p => p + ' ,')}</li></ul>
                    {errors.platform && ( <p className={stl.error}> {errors.platform} </p> )}

                    <label>Genero:</label>
                    <select onChange={handleGenres}>
                        {allgenres.sort().map(p => {
                            return <option value={p}>{p}</option>
                        })}
                    </select>   
                
                    <ul ><li>{input.genre.map(p => p + ' ,')}</li></ul> 
 
                    <button className={stl.bot} type='submit'>Add Game</button> 
                    <span><Link to='/home'><button className={stl.bot2}>Back To Home</button></Link> </span>
                </div>
            </form>
        </div>
        <div/>
        </>
    )
}
