import React, {useState, useEffect} from 'react'
import { getTimeFormat } from '../requests/helper';

export default function BlogCard({data}) {
    const [description, setDescription] = useState('N/A')
    const [title, setTitle] = useState('N/A')
    const [tag, setTag] = useState('Common')
    const [id, setId] = useState('')
    const [user, setUser] = useState('')
    const [timestamp, setTimestamp] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setDescription(data.description)
        setTitle(data.title)
        setTag(data.category)
        setId(data._id)
        setTimestamp(data.createdAt)
        setUser(data.username)
        setImage(data.image || 'https://www.musicianwithadayjob.com/wp-content/uploads/2018/05/aerial-3246120_1280.jpg')
        setLoading(false)
    }, [])
    return (
        <div className="card p-3 mb-4 blogcard">
            {loading ?
            <p>loading...</p>
            : <div className="row">
                <div className="col-lg-4 my-2">
                    <a href={`/blog/${id}`}>
                        <img src={image}
                            className='img-fluid' style={{height: 200, width: "100%"}} alt="" />
                    </a>
                </div>
                <div className="col-lg-8 my-2">
                    <h5 className='mb-2'>
                        <a href={`/blog/${id}`} className='title'>
                            {title.length > 48 ? `${title.substring(0, 44)} ...` : title}
                        </a>
                    </h5>
                    <div className="tags d-flex">
                        <p className='mx-2'>
                            {`#${tag.toUpperCase()}`}
                        </p>
                    </div>
                    <p className='mb-0'>
                        {description.length > 165 
                            ? `${description.substring(0, 160)}...` 
                            : description}
                    </p>
                    <div className="d-flex flex-row-reverse">
                        <a href={`/blog/${id}`} 
                        style={{color: 'black', textDecoration: 'none', fontWeight: 'bold', fontStyle: 'italic'}}>
                            Continue Reading →</a>
                    </div>
                    <div className="d-flex align-items-center">
                        <i className="fas fa-pen-nib"></i> 
                        <a href={`/user/${user && user}`} className='custom-link mx-1'>
                            {user}
                        </a>
                        <div className="text-muted">
                           { ` | ${new Date(timestamp).toDateString()}`}
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
