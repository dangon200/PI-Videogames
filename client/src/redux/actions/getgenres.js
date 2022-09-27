import { GET_GENRES } from './index.js';

import axios from 'axios'

export default function getgenres() {
    return async function (dispatch){
        var result = await (await axios.get('http://localhost:3001/genres')).data.sort();
        result.unshift("All")
        return dispatch({ 
            type: GET_GENRES, 
            payload: result
        })                                                                                              
    }
}