import React, {useState, useEffect, useContext} from 'react'
import { getPostById, updatePostById, uploadFile } from '../requests/api'
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'
import { LoginContext } from '../context/ContextProvider';

export default function EditPost({match}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('Common')
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)
    const [file, setFile] = useState('')

    const account = useContext(LoginContext)

    useEffect(() => {
        getImage()
    }, [file])

    const getImage = async () => {
        if (file){
            const data = new FormData();
            data.append('name', file.name)
            data.append('file', file)
            try {
                const res = await uploadFile(data)
                if (res.status === 200){
                    toast.success('Image uploaded successfully')
                    setImage(res.data)
                }
                else{
                    toast.error("Couldn't upload the image")
                }
            } catch (error) {
                toast.error("Couldn't upload the image")
            }
        }
    }

    let history = useHistory()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await getPostById(match.params.id)
            if (res.status === 200){
                setPost(res.data)
                setTitle(res.data.title)
                setDescription(res.data.description)
                setImage(res.data.image || 'https://www.musicianwithadayjob.com/wp-content/uploads/2018/05/aerial-3246120_1280.jpg')
                setCategory(res.data.category)
            }
        } catch (error) {
            history.push('/')
            toast.error('Blog not found !!!');
        }
        setLoading(false)
    }

    const handleUpdate = async () => {
        try {
            const res = await updatePostById(match.params.id, {
                ...post, title, description, category, image,
                username: account && account.account
            })
            if (res.status === 200){
                history.push(`/blog/${post._id}`)
            }
        } catch (error) {
            history.push(`/blog/${post.id}`)
            toast.error('Something went wrong, please try again !!!');
        }
        setLoading(false)
    }

    const handleImage = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div className='container my-5'>
            {loading
            ? <p>Loading ...</p>
            : <div className="card p-4">
                <img src={image} alt="" className="card-img-top img-fluid" 
                    style={{height: 400, width: '100%'}} />
                <div className="d-flex justify-content-between mt-3">
                    <label className='btn btn-secondary my-2' style={{width: 200}} htmlFor="blogImage">
                        <i className="fas fa-plus-circle"></i> Upload Image
                        <input type="file" name="blogImage" id="blogImage" 
                                onChange={handleImage}
                                className='form-control mb-5' style={{display: 'none'}}/>
                    </label>

                    <button className='btn btn-success my-2' style={{width: 200}}
                        onClick={() => handleUpdate()}>
                        <i className="fas fa-file-import"></i> Save changes
                    </button>
                </div>
                <div className="my-5">
                    <h6 className='p-0 my-3'>Category:</h6>
                    <select name="category" id="category" className='form-control' defaultValue={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value="Tech">Tech</option>
                        <option value="Javascript">Javascript</option>
                        <option value="WebDev">WebDev</option>
                        <option value="Programming">Programming</option>
                        <option value="Career">Career</option>
                        <option value="Common">Common</option>
                    </select>
                </div>
                <h6 className='p-0 m-0'>Title:</h6>
                <input type="text" name="title" id="title" placeholder='Title Goes here ...'
                    className='form-control my-3' minLength={10} maxLength={140} 
                    value={title} onChange={(e) => setTitle(e.target.value)} />
                <h6 className='p-0 m-0 mt-2'>Blog Description:</h6>
                <textarea name="content" id="content" cols="30" rows="10"
                    className='my-3 form-control' placeholder='Content goes here ...' 
                    value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>}
        </div>
    )
}
