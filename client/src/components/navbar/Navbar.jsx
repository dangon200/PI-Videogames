import React from 'react'
import './Navbar.css'
import {GoDiffAdded} from "react-icons/go";
import { SearchBar, Filters, NavbarLogo } from '../index'
import { Link } from 'react-router-dom'

const Navbar = ({ setCurrentPage, setLoading }) => {
    return (
        <div className="pi__navbar">
            <div className="pi__navbar-head">
                <Link to="/home">
                    <NavbarLogo />
                </Link>
                <SearchBar
                    setCurrentPage={setCurrentPage}
                    setLoading={setLoading}
                />
                <div className="pi__navbar-head_buttons">
                    <Link to="/create">
                        <div  alt="plus"
                            className="init_plus"><GoDiffAdded/></div>
                        <div
                            alt="plus"
                            className="hover_plus"
                        ><GoDiffAdded/></div>
                        <span>Add new game</span>
                    </Link>
                </div>
            </div>
            <div className="pi__navbar-form">
                <Filters />
            </div>
        </div>
    )
}

export default Navbar
