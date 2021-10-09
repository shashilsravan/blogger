import React from 'react'

export default function MiniRCard({post}) {
    return (
        <div>
            <a href={`/blog/${post._id}`} style={{textDecoration: 'none'}}>
                <div className="row my-3">
                    <div className="col-md-4">
                        <img src={post.image} alt="" className='img-fluid' style={{height: '100%'}} />
                    </div>
                    <div className="col-md-8">
                        <h6>
                            {post.title.length > 30 ? `${post.title.substring(0, 30)} ...` : post.title}
                        </h6>
                        <p className='text-muted m-0 p-0'>By {post.username}</p>
                    </div>
                </div>
            </a>
        </div>
    )
}
