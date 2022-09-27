import React, { useEffect } from "react";
import {useDispatch} from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import getplatforms from '../../redux/actions/getplatforms'
import getgenres from '../../redux/actions/getgenres';
import getvgames from "../../redux/actions/getvideogames";
import sortvgames from "../../redux/actions/sortvgames";
import stl from './LandingPage.module.css'

export default function LandingPage() {
   const dispatch = useDispatch();
   const hist = useHistory()

 //Get Platforms from API  
   useEffect (() => {
      dispatch(getplatforms()); 
  },[dispatch])

  //Get Genres from API
   useEffect (() => {
      dispatch(getgenres()); 
   },[dispatch])

   useEffect (() => {
      dispatch(getvgames()); 
   },[dispatch])
   
   function handleSortvgames(e) {
      dispatch(sortvgames('asc'))
      
      hist.push("/home")
  }

    return (
      <body>
      <section className={stl.LoginComponent}>
         <div className= {stl.lpcontainer}>

          <button className={stl.but} onClick={handleSortvgames}>INGRESAR</button>

         </div>
          
       </section>
       </body> 
    )  
}