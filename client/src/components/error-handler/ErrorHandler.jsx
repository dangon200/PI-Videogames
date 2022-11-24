import { clearFilters } from 'app/actions'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './ErrorHandler.css'

const ErrorHandler = ({ error }) => {
    const dispatch = useDispatch()
    const games = useSelector(state => state.games)
    const handleBack = () => {
        dispatch(clearFilters(games))
    }

    return (
        <div className="pi__error section__padding">
            <h1>Error</h1>
            <p>{error}</p>
            <button onClick={handleBack}>Back</button>
        </div>
    )
}

export default ErrorHandler
