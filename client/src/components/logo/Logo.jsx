import React from 'react'
import logo from '../../assets/logo.png'
import './Logo.css'

const Logo = () => {
    return (
        <div className="pi__logo">
            <img src={logo} alt="logo" />
            <h1>Videogames</h1>
        </div>
    )
}

export default Logo
