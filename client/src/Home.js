import React from 'react'
import Banner from './home-components/Banner';
import Categories from './home-components/Categories';
import PostsBody from './home-components/PostsBody';

export default function Home() {
    return (
        <div>
            <Banner />
            <Categories />
            <PostsBody />
        </div>
    )
}
