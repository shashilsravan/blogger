import React, {useState, useEffect} from 'react'
import BlogCard from '../global-components/BlogCard'
import MiniRCard from '../global-components/MiniRCard'
import Pagination from '../global-components/Pagination'
import { getPosts, getThreePopular } from '../requests/api'

export default function PostsBody() {
    const [posts, setPosts] = useState([])
    const [popularPosts, setPopularPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(3)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await getPosts()
            const res2 = await getThreePopular()
            setPopularPosts(res2.data)
            if (res.status === 200){
                setPosts(res.data)
            }
        } catch (error) {
            console.log('error 1 :>> ', error);
        }
    }

    const  paginate = (number) => {
        setCurrentPage(number)
    }

    return (
        <div className='container mt-2 mb-4'>
            <div className="row">
                <div className="col-lg-9 p-2 my-2">
                    {currentPosts.map(each => {
                        return <BlogCard key={each._id} data={each} />
                    })}
                    <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} 
                        paginate={paginate} currentPage={currentPage} />
                </div>
                <div className="col-lg-3 my-3">
                    <div className="card mycard mx-auto">
                        <h5 className='title'>About Developer</h5>
                        <img src="https://github.com/shashilsravan/ssstore/blob/main/images/profile.jpg?raw=true" 
                            alt="" className="card-img-top image-rounded" />
                        <div className="card-body">
                            <h4 className='text-center'>Shashil Sravan</h4>
                            <p>
                                I am Sravan, aspiring fullstack developer with working experience 
                                on MERN stack projects and currently working as RoR developer in PromptCloud.
                            </p>
                            <div className="media-icons d-flex flex-wrap">
                                <a href="/" className='icon in-icon mx-2'>
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="/" className='icon gh-icon mx-2'>
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="/" className='icon li-icon mx-2'>
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="/" className='icon gm-icon mx-2'>
                                    <i className="fas fa-envelope"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                
                    <div className="mt-4 p-2">
                        <h4>Popular posts</h4>
                        {popularPosts.map(each => {
                            return (
                                <React.Fragment key={each._id}>
                                    <MiniRCard post={each} />
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
