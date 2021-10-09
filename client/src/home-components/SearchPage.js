import React, {useState, useEffect} from 'react'
import BlogCard from '../global-components/BlogCard'
import { getPostsBySearch } from '../requests/api'

export default function SearchPage({location}) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    

    let query = location.search
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await getPostsBySearch(query)
            if (res.status === 200){
                setPosts(res.data)
            }
        } catch (error) {
            console.log('error 1 :>> ', error);
        }
        setLoading(false)
    }

    return (
        <div className='container mt-4 mb-4'>
            <h4 className='mt-5'>Search results for - {query.split('=')[1]}</h4>
            <p className='text-muted'>
                {posts && `(${posts.length} results)`}
            </p>
            {
                loading ?
                <p className='my-5'>Loading ...</p>
                : <div className="row">
                    { posts.length > 0 
                    ? <div className="p-2 my-2">
                        {posts.map(each => {
                            return <BlogCard key={each._id} data={each} />
                        })}
                    </div>
                    : <div className="alert alert-danger my-5" role="alert">
                        No posts available
                    </div>
                    }
                </div>
            }
        </div>
    )
}
