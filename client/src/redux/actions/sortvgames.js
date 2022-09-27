import {SORT_VGAMES} from './index.js';

export default function sortvgames(payload) {
    return {
        type: SORT_VGAMES,
        payload
    }
}