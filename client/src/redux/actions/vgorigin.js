import { VIDEOGAMES_ORIGIN } from './index.js';

export default function vgorigin(payload) {
    return {
        type: VIDEOGAMES_ORIGIN,
        payload
    }
}