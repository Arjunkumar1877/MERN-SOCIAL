import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import morgan from 'morgan';
// import { register } from 'module';
import { register } from './controllers/auth.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import postRoute from './routes/post.js';
import { verifyToken } from './middlewares/auth.js';


//  CONFIGURATIONS 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan(" common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE 
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });
// ROUTES WITH FILES 
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), )


// ROUTES
app.use("/auth", authRoute);
app.use('/user', userRoute);
app.use("/posts", postRoute);

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('MongoDb connected');
})
.then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
})
.catch((err)=>{
    console.log(err)
})


