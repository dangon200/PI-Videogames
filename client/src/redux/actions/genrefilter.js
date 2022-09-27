import { GENRES_FILTER } from './index.js';

export default function genrefilter(payload) {
    return {
        type: GENRES_FILTER,
        payload
    }
}