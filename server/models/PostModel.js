import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
        image: {type: String, required: false, default: 'https://www.musicianwithadayjob.com/wp-content/uploads/2018/05/aerial-3246120_1280.jpg'},
        title: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        username: {type: String, required: true},
        category: {type: String, required: true, default: 'Common'}
    }, {
        timestamps: true
    }
)

const Post = mongoose.model('Post', postSchema)

export default Post