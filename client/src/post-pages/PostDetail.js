import React, {useState, useEffect, useContext} from 'react'
import MiniRCard from '../global-components/MiniRCard'
import { deleteAllComments, deletePostById, getPostById, getThreeBlogs, getThreePopular } from '../requests/api'
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'
import Comments from './Comments';
import { confirmAlert } from 'react-confirm-alert';
import { LoginContext } from '../context/ContextProvider';

export default function PostDetail({match}) {
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)
    const [relatedPosts, setRelatedPosts] = useState([])
    const [popularPosts, setPopularPosts] = useState([])

    let history = useHistory()
    const account = useContext(LoginContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getPostById(match.params.id).then(res => {
                    setPost(res.data)
                })
                const res2 = await getThreePopular()
                setPopularPosts(res2.data)
            } catch (error) {
                history.push('/')
                toast.error('Blog not found !!!');
            }
            setLoading(false)
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchRelatedData = async () => {
            if (post){
                const res2 = await getThreeBlogs(post && post.category)
                setRelatedPosts(res2.data)
            }
        }
        fetchRelatedData()
    }, [post])

    

    const handleDelete = async (id) => {
        try {
            const res = await deletePostById(id)
            await deleteAllComments(id)
            if (res.status === 200){
                toast.success('Blog deletion is successful')
                history.push('/')
            }
            else{
                toast.error('error deleting the blog, please try again')
            }
        } catch (error) {
            toast.error('error deleting the blog, please try again')
        }
    }

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Going to delete a blog',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete(id)
                },
                {
                    label: 'No',
                    onClick: () => console.log('Nice')
                }
            ]
        });
    }

    return (
        <div className='container my-4'>
            {
            post === {}
            ? <p>loading ...</p>
            : <div className="row">
                <div className="col-lg-9 my-3">
                    <div className="card p-4">
                        <div className="tags d-flex">
                            <p className='mx-2'>
                                <a href={`/custom?category=${post && post.category}`}
                                    className='text-theme'>
                                    {`#${post && post.category}`}
                                </a>
                            </p>
                        </div>
                        <h3>{post && post.title}</h3>
                        <div className="d-flex">
                            <a href={`/user/${post && post.username}`} className='text-theme'>{post && post.username}</a> &nbsp; / &nbsp;
                            <div className="text-muted">
                                {post && new Date(post.createdAt).toDateString()}
                            </div>
                        </div>
                        <img src={post && post.image} alt={post && post.title} 
                            className="img-fluid my-4" style={{width: '100%', height: 400}} />
                        { post && post.username === account.account &&
                            <div className="d-flex mb-3 justify-content-between">
                            <a className='btn btn-outline-primary' href={`/blog/${post && post._id}/edit`}>
                                <i className='fas fa-edit'></i>
                            </a>
                            <button className='btn btn-outline-danger' onClick={() => confirmDelete(post._id)}>
                                <i className='fas fa-trash'></i>
                            </button>
                        </div>}
                        <div className="mt-3" style={{whiteSpace: "pre-wrap"}}>
                            {post && post.description}
                        </div>
                    </div>
                    <div className="row my-3">
                        {post && <Comments post={post} />}
                    </div>
                </div>
                <div className="col-lg-3 my-3">
                    <div className="card mycard mx-auto mb-5">
                        <h5 className='title'>About Author</h5>
                        <img src="https://thumbs.dreamstime.com/b/person-gray-photo-placeholder-man-costume-white-background-person-gray-photo-placeholder-man-136701248.jpg" 
                            alt="" className="card-img-top image-rounded" />
                        <div className="card-body">
                            <h4 className='text-center'>
                                {post && post.username}
                            </h4>
                            <p>
                                This blog is written by {post && post.username}
                                <br />
                                if you want to write such blogs as exciting as this, 
                                please apply for blogger access via the link in the header.
                            </p>
                        </div>
                    </div>

                    <div className="card mycard mx-auto my-5">
                        <h5 className='title'>Related Blogs</h5>
                        <div className="card-body p-0">
                            {relatedPosts && relatedPosts.map(each => {
                                return (
                                    <React.Fragment key={each._id}>
                                        <MiniRCard post={each} />
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div>
                
            </div>}
            <h4 className='mt-4'>Popular posts:</h4>
            <div className="row my-4">
                {popularPosts.map(each => {
                    return (<div className="col-lg-4" key={each._id}>
                        <div className="card">
                            <img src={each.image} alt="" className="card-img-top img-fluid" />
                            <div className="card-body">
                                <a href="/" className='not-link'>
                                    <h5 className='px-4'>
                                        {each.title}
                                    </h5>
                                </a>
                                <p className='text-theme px-4' style={{fontWeight: 'bold'}}>
                                    - {each.username}
                                </p>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}
