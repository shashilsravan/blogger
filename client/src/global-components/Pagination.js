import React from 'react'

export default function Pagination({postsPerPage, totalPosts, paginate, currentPage}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){    
        pageNumbers.push(i)
    }

    return (
        <nav className='bg-white'>
            <ul className="pagination justify-content-center ">
                <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                    <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>
                        &laquo;
                    </a>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} 
                        className={currentPage === number 
                            ? 'page-item active mx-2' : 'page-item mx-2'}>
                        <a href="#" className='page-link' onClick={() => paginate(number)}>
                            {number}
                        </a>
                    </li>
                ))}
                <li className={currentPage === pageNumbers.length ? "page-item disabled" : "page-item"}>
                    <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>
                        &raquo;
                    </a>
                </li>
            </ul>
        </nav>
    )
}
