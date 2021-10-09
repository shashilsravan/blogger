import React, {useState, useEffect, useContext} from 'react'
import { createPost, uploadFile } from '../requests/api'
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
import { LoginContext } from '../context/ContextProvider';

export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Common')
    const [image, setImage] = useState('https://www.freecodecamp.org/news/content/images/2021/08/chris-ried-ieic5Tq8YMk-unsplash.jpg')
    const [file, setFile] = useState('')
    const account = useContext(LoginContext)
    const [loading, setLoading] = useState(false)

    let history = useHistory()

    const handleImage = (e) => {
        setFile(e.target.files[0]);
    }

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

    const handleClick = async () => {
        try {
            const response = await createPost({
                title, description, image, category,
                username: account && account.account, 
            })
            if (response.status === 200){
                setLoading(true)
                setTimeout(() => {
                    history.push(`/blog/${response.data._id}`)
                    setLoading(false)
                }, 2500);
            }
        } catch (error) {
            toast.error('Something went wrong, please try again later')
        }
    }
    return (
        <div className='container my-5'>
            { loading ? <p>Loading ... </p>
            : <div className="card p-4">
                <img src={image}
                    alt="" className="card-img-top img-fluid" 
                    style={{height: 300, width: '100%'}} />
                <div className="d-flex justify-content-between mt-3">
                    <label className='btn btn-secondary my-2' style={{width: 200}} htmlFor="blogImage">
                        <i className="fas fa-plus-circle"></i> Upload Image
                        <input type="file" name="blogImage" id="blogImage" 
                            onChange={handleImage}
                            className='form-control mb-5' style={{display: 'none'}}/>
                    </label>

                    <button className='btn btn-success my-2' style={{width: 200}}
                        onClick={handleClick}>
                        <i className="fas fa-file-import"></i> Publish
                    </button>
                </div>
                <div className="my-4">
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
                
                <h6 className='p-0 m-0 mt-3'>Title:</h6>
                <input type="text" name="title" id="title" placeholder='Title Goes here ...'
                    className='form-control my-3' minLength={10} maxLength={140} 
                    value={title} onChange={(e) => setTitle(e.target.value)} />

                <h6 className='p-0 m-0 mt-3'>Description:</h6>
                <textarea name="content" id="content" cols="30" rows="10"
                    className='my-3 form-control' placeholder='Content goes here ...' 
                    value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>}
        </div>
    )
}
