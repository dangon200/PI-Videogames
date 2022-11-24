import React from 'react'
import './NavbarLogo.css'
import p from '../../assets/logoNav.png'; // with import

const NavbarLogo = () => {
    return (
        <div className="pi__navbar-logo">
            <img src={p} alt="logo" className="pi__navbar-logo"/>
            <h1>Videogames</h1>
        </div>
    )
}

export default NavbarLogo
