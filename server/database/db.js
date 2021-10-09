import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, { 
            useNewUrlParser: true, useUnifiedTopology: true
        })
        console.log('DB connection successful :>> ');
    } catch (error) {
        console.log('error :>> ', error);
    }
}