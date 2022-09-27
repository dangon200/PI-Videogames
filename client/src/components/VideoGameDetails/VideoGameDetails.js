import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import getvgamebyid from '../../redux/actions/getvgamebyid'
import stl from './VideoGameDetails.module.css';

export default function VideoGameDetails(props) {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const id = props.match.params.id
        dispatch(getvgamebyid(id))

    },[])

    var detail = useSelector((state) => {
    debugger;
    return state.videodetails}
    )
    
    return (
        <div className={stl.wrapper}>          
            <div className={stl.contarea}>
                <div className={stl.lineflex}>
                <h2><Link to='/home'>
                    <button className={stl.botback}>Regresar</button>
                </Link></h2>        
                </div>
                <h2>{detail.name}</h2>  
                <img className={stl.detimg} src= {detail.image} alt="No image found" width='600px' heigth='300px' ></img>    
                <h3>Descripción</h3>
                <h5>{detail.description}</h5>
                <div className={stl.lineflex}>
                   <h4>{`Puntaje:   ${detail.rating}`} </h4>
                </div>
                <div className={stl.lineflex}>
                   <h4>{`Fecha de Lanzamiento:  ${detail.released}`}  </h4>
                </div>               
                <h4>{`Plataformas:  ${detail.platforms}`}</h4>
                <h4>{`Genero: ${detail.genres}`}</h4>
            </div>          
        </div>
    )

}