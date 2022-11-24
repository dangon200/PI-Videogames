import React from 'react'
import './Loader.css'

const Loader = () => {
    return (
        <div className="pi__loader">
            <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h1>Loading...</h1>
        </div>
    )
}

export default Loader
