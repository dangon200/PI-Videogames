import React from 'react'
import './Pagination.css'

const Pagination = ({ totalCards, cardsPerPage, setCurrentPage }) => {
    let pages = []
    for (let index = 1; index <= Math.ceil(totalCards / cardsPerPage); index++) {
        pages.push(index)
    }
    return (
        <div className="pi__pagination">
            {pages.map((page, index) => {
                return (
                    <button key={index} onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
                )
            })}
        </div>
    )
}

export default Pagination
