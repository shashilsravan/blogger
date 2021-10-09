import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan';
import { connectDB } from './database/db.js';
import postRoutes from './routes/PostRoutes.js'
import * as path from 'path';

dotenv.config();

const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())


connectDB()
app.use('/api/posts', postRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production' ){
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 7000
app.listen(PORT, console.log('server is running at :>>', PORT))