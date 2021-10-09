import React from 'react'
import { categoriesList } from '../constants/Categories'

export default function Categories() {
    return (
        <div className='container mt-5 d-flex align-items-center'>
            <h4>Categories: </h4>
            <ul className="categories-list d-flex">
                {categoriesList.map((each, index) => {
                    return <li key={index}>
                        <a href={`/custom?category=${each}`}>#{each}</a>
                    </li>
                })}
            </ul>
        </div>
    )
}
