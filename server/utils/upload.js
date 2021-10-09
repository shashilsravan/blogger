import {GridFsStorage} from 'multer-gridfs-storage';
import multer from 'multer';
import dotenv from 'dotenv'
dotenv.config();

const url = process.env.MONGO_DB_URI
const storage = new GridFsStorage({ 
    url, 
    options: { useUnifiedTopology: true, useNewUrlParser: true },
    file: (req, file) => {
        const match = ['image/png', 'image/jpeg', 'image/jpg']
        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-blog-${file.originalname}`
        }
        return {
            bucketName: 'images', 
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});
export default multer({storage}); 