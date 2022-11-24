import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchGame } from '../../app/actions/index'
import {FaSearch} from "react-icons/fa"
import './SearchBar.css'

const SearchBar = ({ setCurrentPage, setLoading }) => {
    const [game, setGame] = useState('')
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

    const handleSearch = e => {
        e.preventDefault()

        if (!game || game === '') {
            setError(true)
            return
        }

        setError(false)
        dispatch(searchGame(game))
        setCurrentPage(1)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
        setGame('')
    }

    const onChangeInput = e => {
        setGame(e.target.value.toLowerCase())
    }

    return (
        <div className="pi__search">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={onChangeInput}
                    name="name"
                    className={error ? 'error' : ''}
                    value={game}
                />
                <button type="submit">
                    <div className="init_img"><FaSearch/></div>
                    <div className="hover_img"><FaSearch/></div>
                </button>
            </form>
        </div>
    )
}

export default SearchBar
