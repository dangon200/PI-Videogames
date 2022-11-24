import React, { useEffect, useState } from 'react'
import './Details.css'
import {BsStarFill} from 'react-icons/bs';
import {MdArrowBackIosNew} from 'react-icons/md'
import { getGameById } from '../../app/actions/index'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Loader } from 'components'

const Details = () => {
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const game = useSelector(state => state.gameDetail)
    const dispatch = useDispatch()

    const useQuery = () => new URLSearchParams(useLocation().search)

    let query = useQuery()

    useEffect(() => {
        setLoading(true)
        dispatch(getGameById(id, query.get('db')))
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        <div className="pi__detail section__padding">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="pi__detail-head">
                        <Link to="/home">
                            <div className="pi__detail-back">
                                <div><MdArrowBackIosNew/></div>
                                <span>Back to Home</span>
                            </div>
                        </Link>
                        <img src={game.bg} alt="bg" />
                        <h1> {game.name}</h1>
                        <div className="pi__detail-rating">
                            <div alt="star"><BsStarFill/></div>
                            <p>{game.rating}</p>
                        </div>
                        <div className="pi__detail-genres">
                            {game.genres?.map(g => {
                                return <span key={g.id}>{g.name}</span>
                            })}
                        </div>
                        <p>Released: &nbsp; {game.released}</p>
                    </div>
                    <div className="pi__detail-content">
                        <p
                            className="pi__detail-description"
                            dangerouslySetInnerHTML={{
                                __html: game?.description
                            }}></p>
                        <div className="pi__detail-platforms">
                            {game.platforms?.map(p => {
                                return <span key={p.id}>{p.name}</span>
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Details
