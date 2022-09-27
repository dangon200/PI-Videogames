import { GET_VIDEOGAMES } from './index.js';
import axios from 'axios'

export default function getvgames() {
    return async function (dispatch){
        var result = await axios.get('http://localhost:3001/videogames'); 
        console.log(result)
        return dispatch({ 
            type: GET_VIDEOGAMES, 
            payload: result.data
        })                                                                                                 
    }
}