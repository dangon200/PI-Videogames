import React, { Fragment, useEffect } from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import getvgames from '../../redux/actions/getvideogames';
import {Link, useHistory} from 'react-router-dom'
import  Vgcard from '../Vgcard/Vgcard';
import Paging from '../Paging/Paging';
import stl from '../HomePage/HomePage.module.css'
import genrefilter from '../../redux/actions/genrefilter';
import getplatforms from '../../redux/actions/getplatforms';
import vgorigin from '../../redux/actions/vgorigin';
import getgenres from '../../redux/actions/getgenres';
import sortvgames from '../../redux/actions/sortvgames';
import SearchBar from '../SearchBar/SearchBar';

export default function HomePage () {
    const dispatch = useDispatch();
    const history = useHistory()
    const allVgames = useSelector((state) => state.videogames) 
    const allgenres = useSelector((state) => {
    return state.genres
    }
    )
    const [currentPage, setCurrentPage] = useState(1) 
    const [vgamesPerPage, setvgamesPerPage] = useState(15)
    const [isReady, setIsReady] = useState(false)
    const lastVgameIndex = currentPage * vgamesPerPage 
    const firstVgIndex = lastVgameIndex - vgamesPerPage 
    const currentVgames = allVgames.slice(firstVgIndex,lastVgameIndex) 
    const [render,setRender] = useState('') 
    const actualPage = (pageNumber) => { 
        setCurrentPage(pageNumber)
    }
    useEffect(()=>{
      handleShowAll()
    }, [])
  
    function handleGenreFilter(e) {
       // debugger;
        e.preventDefault();
        dispatch(genrefilter(e.target.value))
    }

    function handleOriginFilter(e) {
        dispatch(vgorigin(e.target.value))
        setCurrentPage(1)
    }

    function handleShowAll() {
      dispatch(getplatforms())
      dispatch(getvgames())
      dispatch(vgorigin('All'))
      dispatch(sortvgames('asc'))
      dispatch(getgenres())
      setIsReady(true)
  }

    function handleSortvgames(e) {
        e.preventDefault(); 
        dispatch(sortvgames(e.target.value))
        setRender(`Order ${e.target.value}`)  
    }

   

    return (
        <div className= {stl.c1}>
            <div className= {stl.c2}>
                <div>
                   <button className={stl.hpbot} onClick={e => {handleShowAll(e)}}>Cargar Juegos</button>
                </div>
                <div>   
                  <button disabled={!isReady} onClick={()=> history.push("/videogame")} className={stl.hpbot}>Agregar Juego</button>  
                </div>
                <div>           
                   <SearchBar/>
                </div>
                <div>                    
                  <select className={stl.hpfilter} onChange={e => handleGenreFilter(e)}>
                  {allgenres ? 
                  allgenres.map((e,i) => {
                         return <option key={i.toString()} value={e}>{e}</option>
                    }) : <></>
                  }         
                  </select>
                </div>
                <div>  
                  <select className={stl.hpfilter} onChange={e => handleSortvgames(e)} onBlur={e => handleSortvgames(e)}>
                    <option key={"1b"}  value='asc'>Ordenar</option>
                    <option key={"2b"}  value='asc'>A-Z</option>
                    <option key={"3b"}  value='desc'>Z-A</option>
                    <option key={"4b"}  value='rating'>Puntaje</option>
                    <option key={"5b"}  value='date'>Lanzamiento</option>
                  </select>
                </div>  
                <div>
                  <select className={stl.hpfilter} onChange={e => handleOriginFilter(e)}> 
                    <option key={"1c"}value='All'>Api+DB Games</option>
                    <option key={"2c"} value='DB'>Db Games</option>
                    <option key={"3c"} value='API'>Api Games</option>
                  </select>
                </div>
            </div>    
            <div className={stl.c4}>
                <Paging vgamesPerPage={vgamesPerPage} allVgames={allVgames.length} currpage={currentPage} actualPage={actualPage}/>
            </div>
            <div className={stl.c5}> {/*ACA NO MAPEO TODOS LOS VGAMES SINO SOLO LOS DE LA PAGINA ACTUAL del Slice */}
                {currentVgames && currentVgames.map((p,i) => {
                    return (
                        <>
                          <Link key={i.toString()+"a"} to ={"/videogame/" + p.id}>
                             <Vgcard name= {p.name} image= {p.image} genres= {p.genres} key={p.id} rating={p.rating}/>
                          </Link>
                        </>  
                   )})                
                }
            </div>
        </div>
    )
}