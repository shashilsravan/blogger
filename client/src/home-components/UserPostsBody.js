import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import BlogCard from '../global-components/BlogCard'
import { getPostsByUser } from '../requests/api'

export default function UserPostsBody() {
    const [posts, setPosts] = useState([])

    let { name } = useParams();
    console.log('name :>> ', name);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await getPostsByUser(name)
            if (res.status === 200){
                setPosts(res.data)
            }
        } catch (error) {
            console.log('error 1 :>> ', error);
        }
    }
    return (
        <div className='container mt-2 mb-4'>
            <div className="row">
                <div className="col-lg-9 p-2 my-2">
                    {posts.map(each => {
                        return <BlogCard key={each._id} data={each} />
                    })}
                </div>
                <div className="col-lg-3 my-3">
                    <div className="card mycard mx-auto">
                        <h5 className='title'>About Author</h5>
                        <img src="https://github.com/shashilsravan/ssstore/blob/main/images/profile.jpg?raw=true" 
                            alt="" className="card-img-top image-rounded" />
                        <div className="card-body">
                            <h4 className='text-center'>Shashil Sravan</h4>
                            <p>
                                I am Sravan, aspiring fullstack developer with working experience 
                                on MERN stack projects and currently working as RoR developer in PromptCloud.
                            </p>
                            <div className="media-icons d-flex flex-wrap">
                                <a href="https://www.instagram.com/sravanss_45/" className='icon in-icon mx-2' target='_blank'>
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="https://github.com/shashilsravan/" className='icon gh-icon mx-2' target='_blank'>
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/shashil-sravan-a5b201191/" className='icon li-icon mx-2' target='_blank'>
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="mailto:shashilsravan.ss.ss@gmail.com" className='icon gm-icon mx-2' target='_blank'>
                                    <i className="fas fa-envelope"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
