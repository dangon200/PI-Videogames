import React, { useState } from 'react'
import { createGame } from 'app/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { NavbarLogo } from '../../components'
import './Create.css'
import {MdArrowBackIosNew} from 'react-icons/md'

const Create = () => {
    const initialState = {
        name: '',
        description: '',
        releaseDate: '',
        review: '',
        rating: 0,
        genres: [],
        platforms: []
    }
    const [state, setState] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [done, setDone] = useState(false)

    const history = useHistory()

    const games = useSelector(state => state.games)
    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)
    const dispatch = useDispatch()

    const validate = input => {
        let errors = {}
        const existingGame = games.find(
            g => g.name.toLowerCase() === input.name.toLowerCase()
        )

        if (input.name === '') errors.name = 'Name is required'
        if (!/^[a-zA-Z\d\s:]{4,200}$/.test(input.name))
            errors.name = 'Invalid name'
        if (existingGame) errors.name = 'Game already exists'
        if (input.description === '')
            errors.description = 'Description is required'
        if (input.platforms.length < 1) errors.platforms = 'Platforms required'
        if (input.genres.length < 1) errors.genres = 'Genres required'
        if (input.rating < 1 || input.rating > 5)
            errors.rating = 'Rating, min: 1. max: 5'
        if ((input.releaseDate = '')) errors.releaseDate = 'Date required'

        return errors
    }

    const handleInput = e => {
        setErrors(
            validate({
                ...state,
                [e.target.name]: e.target.value
            })
        )
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleGenres = e => {
        setErrors(
            validate({
                ...state,
                genres: e.target.value
            })
        )
        if (!state.genres.includes(e.target.value)) {
            setState({
                ...state,
                genres: [...state.genres, e.target.value]
            })
        }
    }
    const handlePlatforms = e => {
        setErrors(
            validate({
                ...state,
                platforms: e.target.value
            })
        )
        if (!state.platforms.includes(e.target.value)) {
            setState({
                ...state,
                platforms: [...state.platforms, e.target.value]
            })
        }
    }

    const deletePlatform = e => {
        setState({
            ...state,
            platforms: state.platforms.filter(p => p !== e.target.id)
        })
    }

    const deleteGenre = e => {
        setState({
            ...state,
            genres: state.genres.filter(g => g !== e.target.id)
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (Object.keys(errors).length > 0) return
        dispatch(createGame(state))
        setErrors({})
        setState(initialState)
        setDone(true)
        setTimeout(() => {
            history.push('/home')
        }, 2500)
    }

    const resetForm = () => {
        setState(initialState)
        setErrors({})
    }

    return (
        <div className="pi__create">
            <div className="pi__create-head">
                <Link to="/home">
                    <NavbarLogo />
                </Link>
            </div>
            <div className="pi__create-container">
                <Link to="/home">
                    <div className="pi__create-back">
                        <div><MdArrowBackIosNew/></div>
                        <span>Back to Home</span>
                    </div>
                </Link>
                <div className="pi__create-container_side">
                    <h1>
                        Create <br /> New Game
                    </h1>
                </div>
                <div className="pi__create-container_form">
                    {done ? (
                        <h1>Videogame created</h1>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                className={
                                    'pi__create-input' +
                                    (errors.name ? ' danger' : '')
                                }
                                value={state.name}
                                onChange={handleInput}
                            />
                            {errors.name && (
                                <span className="danger">* {errors.name}</span>
                            )}
                            <label htmlFor="platforms">Platforms</label>
                            <select
                                name="platforms"
                                className={
                                    'pi__create-input' +
                                    (errors.platforms ? ' danger' : '')
                                }
                                onChange={handlePlatforms}>
                                <option key="none" value="none">
                                    Select a Platform
                                </option>
                                {platforms &&
                                    platforms.map(platform => {
                                        return (
                                            <option
                                                key={platform.id}
                                                value={platform.name}>
                                                {platform.name}
                                            </option>
                                        )
                                    })}
                            </select>
                            {errors.platforms && (
                                <span className="danger">
                                    * {errors.platforms}
                                </span>
                            )}
                            <div className="pi__create-selected">
                                {state.platforms?.map((p, i) => {
                                    return (
                                        <span
                                            className="input-selected"
                                            key={i}>
                                            {p}
                                            <button
                                                onClick={deletePlatform}
                                                id={p}
                                                className="button-selected">
                                                &times;
                                            </button>
                                        </span>
                                    )
                                })}
                            </div>
                            <label htmlFor="genres">Genres</label>
                            <select
                                name="genres"
                                className={
                                    'pi__create-input' +
                                    (errors.genres ? ' danger' : '')
                                }
                                onChange={handleGenres}>
                                <option key="none" value="none">
                                    Select a Genre
                                </option>
                                {genres &&
                                    genres.map(genre => {
                                        return (
                                            <option
                                                key={genre.id}
                                                value={genre.name}>
                                                {genre.name}
                                            </option>
                                        )
                                    })}
                            </select>
                            {errors.genres && (
                                <span className="danger">
                                    * {errors.genres}
                                </span>
                            )}
                            <div className="pi__create-selected">
                                {state.genres?.map((g, i) => {
                                    return (
                                        <span
                                            className="input-selected"
                                            key={i}>
                                            {g}
                                            <button
                                                id={g}
                                                onClick={deleteGenre}
                                                className="button-selected">
                                                &times;
                                            </button>
                                        </span>
                                    )
                                })}
                            </div>
                            <label htmlFor="review">Review</label>
                            <input
                                type="text"
                                name="review"
                                placeholder="Review"
                                className="pi__create-input"
                                value={state.review}
                                onChange={handleInput}
                            />
                            <div className="pi__create-container_form-sm">
                                <div className="pi__create-container_form-sm_rating">
                                    <label htmlFor="rating">Rating</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        min="0"
                                        max="5"
                                        className={
                                            'pi__create-input' +
                                            (errors.rating ? ' danger' : '')
                                        }
                                        placeholder="0"
                                        value={state.rating}
                                        onChange={handleInput}
                                    />
                                </div>
                                <label htmlFor="releaseDate">
                                    Release Date
                                </label>
                                <input
                                    type="date"
                                    name="releaseDate"
                                    className={
                                        'pi__create-input' +
                                        (errors.releaseDate ? ' danger' : '')
                                    }
                                    value={state.releaseDate}
                                    onChange={handleInput}
                                />
                            </div>
                            {errors.rating && (
                                <span className="danger">
                                    * {errors.rating}
                                </span>
                            )}
                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                cols="20"
                                rows="5"
                                value={state.description}
                                onChange={handleInput}></textarea>
                            {errors.description && (
                                <span className="danger">
                                    * {errors.description}
                                </span>
                            )}
                            <div className="pi__create-button">
                                <button
                                    onClick={resetForm}
                                    className="pi__create-button_reset"
                                    type="reset">
                                    Reset
                                </button>
                                <button
                                    className="pi__create-button_send"
                                    type="submit">
                                    Create
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Create
