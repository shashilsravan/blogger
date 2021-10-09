import Post from "../models/PostModel.js"
import Comment from "../models/CommentModel.js"
import grid from 'gridfs-stream';
import mongoose from 'mongoose';

let gfs;
const conn = mongoose.connection;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const url = ''

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

conn.once('open', () => {
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('images');
});

export const createPost = async (req, res) => {
    try {
        const post = await new Post(req.body)
        post.save()
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 })
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getAllPostsByCategory = async (req, res) => {
    let category = req.query.category;
    try {
        let posts = []
        if (category){
            posts = await Post.find({category: category})
        }
        else{
            posts = await Post.find({})
        }
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getPostsByUser = async (req, res) => {
    try {
        const posts = await Post.find({ username :req.params.name})
        console.log('req.params.name :>> ', req.params.name);
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updatePostById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, { $set: req.body })
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deletePostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        await post.delete();
        return res.status(200).json('Blog deletion successful')
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const uploadImage = (req, res) => {
    try {
        if (!req.file){
            return res.status(404).json("Picture not found")
        }
        else{
            const imageUrl = `/api/posts/file/${req.file.filename}`
            return res.status(200).json(imageUrl)
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getImage = async (req, res) => {
    try {   
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const createComment = async (req, res) => {
    try {
        const comment = await new Comment(req.body)
        comment.save()
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getCommentsById = async (req, res) => {
    try {
        const comments = await Comment.find({postId: req.params.id})
        return res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteComments = async (req, res) => {
    try {
        await Comment.deleteMany({postId: req.params.id})
        return res.status(200).json({message: "successfully deleted"})
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getPostsByCategory = async (req, res) => {
    try {
        const posts = await Post.find({ category: req.params.name})
        let shuffledPosts = shuffle(posts)
        shuffledPosts = shuffledPosts.length > 3 ? shuffledPosts.slice(0, 3) : shuffledPosts
        return res.status(200).json(shuffledPosts)
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

export const getPostsByPopularity = async (req, res) => {
    try {
        const posts = await Post.find({})
        let shuffledPosts = shuffle(posts)
        shuffledPosts = shuffledPosts.slice(0, 3)
        return res.status(200).json(shuffledPosts)
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

export const getAllPostsBySearch = async (req, res) => {
    let val = req.query.val;
    const keyword = req.query.val ? {
        title: {
            $regex: req.query.val,
            $options: 'i'
        }
    } : {}

    try {
        let posts = []
        if (val){
            posts = await Post.find({ ...keyword })
        }
        else{
            posts = await Post.find({})
        }
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json(error)
    }
}