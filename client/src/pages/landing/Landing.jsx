import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'
import { Logo } from '../../components/index'

const Landing = () => {
    return (
        <div className="pi__landing">
            <div className="pi_landing-wrapper">
                <Logo />
                <div className="pi__landing-description">
                    {/* 
            <h3>Welcome to my individual project</h3>
            <p>
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim
            labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet.
            Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum
            Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident.
            </p>
        */}
                    <Link to="/home">
                        <button>home</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing
