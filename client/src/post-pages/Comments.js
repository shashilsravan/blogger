import React, {useState, useEffect, useContext} from 'react'
import { useOktaAuth } from '@okta/okta-react';
import { createComment, getComments } from '../requests/api';
import { LoginContext } from '../context/ContextProvider';

export default function Comments({post}) {
    const { authState } = useOktaAuth();
    const [commentText, setCommentText] = useState('')
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [toggle, setToggle] = useState(false);
    const account = useContext(LoginContext)

    const submitComment = async () => {
        let submitObj = {
            comment: commentText, 
            user: account && account.account,
            postId: post._id
        }
        await createComment(submitObj)
        setCommentText('')
        setLoading(true)
        setToggle(prev => !prev);
    }

    useEffect(() => {
        fetchData()
    }, [toggle, post])

    const fetchData = async () => {
        try {
            const res = await getComments(post._id)
            if (res.status === 200){
                setComments(res.data)
            }
        } catch (error) {
            console.log('error :>> ', error);
        }
        setLoading(false)
    }

    return (
        <div>
           { loading ? <p>Loading ...</p>
           : <>
                {authState.isAuthenticated && (
                    <div className='mt-3'>
                        <h6>Add comment: </h6>
                        <textarea rows='3' className='form-control' value={commentText}
                            onChange={(e) => setCommentText(e.target.value)} />
                        <button className='btn btn-success mt-2 text-end'
                        onClick={submitComment}>Comment</button>
                    </div>
                )}
                { comments.length === 0
                ? <div className="alert alert-primary mt-4">
                    No comments for this blog yet
                </div>
                : <>
                    <h6 className='mt-4 mb-3'>Comments: </h6>
                    <div className="mb-5 py-3 px-4"
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.01)'}}>
                        {comments && comments.map(each => {
                            return (
                                <div key={each._id} className='row'>
                                    <div className="col-md-1 p-0">
                                        <img src="https://www.pepperhub.in/wp-content/uploads/2020/11/user-male.png" 
                                        className='img-fluid' alt="" />
                                    </div>
                                    <div className="col-md-11">
                                        <div className="">
                                            <h5 className='text-primary m-0' style={{textTransform: 'capitalize'}}>
                                                {each.user}
                                            </h5>
                                            <p className='text-muted m-0' 
                                            style={{fontSize: 12}}>
                                                {new Date(each.createdAt).toDateString()} </p>
                                        </div>
                                        <div className="d-flex mt-2">
                                            <p>
                                                {each.comment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>}
            </>}
        </div>
    )
}
