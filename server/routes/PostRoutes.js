import express from 'express';
import { createComment, createPost, deleteComments, deletePostById, getAllPosts, getAllPostsByCategory,
    getAllPostsBySearch,
    getCommentsById,
    getImage,
    getPostById, getPostsByCategory, getPostsByPopularity, getPostsByUser, updatePostById, uploadImage } from '../controllers/PostController.js';
import upload from '../utils/upload.js';
const router = express.Router()

router.get('/search', getAllPostsBySearch)
router.get('/file/:filename', getImage)
router.get('/popular', getPostsByPopularity)
router.get('/advanced', getAllPostsByCategory)
router.post('/new', createPost)
router.post('/comments/new', createComment)
router.get('/', getAllPosts)
router.get('/:id', getPostById)
router.get('/comments/:id', getCommentsById)
router.get('/user/:name', getPostsByUser)
router.get('/category/:name', getPostsByCategory)
router.post('/images/upload', upload.single('file'), uploadImage)
router.put('/:id/updat', updatePostById)
router.delete('/:id/remove', deletePostById)
router.delete('/comments/:id/remove', deleteComments)

export default router