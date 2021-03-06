import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotnev from 'dotenv';
import postRoutes from './routes/posts.js';

const app = express();
dotnev.config();


app.use(bodyParser.json({ limit : "30mb", extended:true }))
app.use(bodyParser.urlencoded({ limit : "30mb", extended:true }))
app.use(cors());
app.use('/posts', postRoutes);

app.get('/', (req,res) => {
    res.send("Hello Memories API");
});
 
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)) )
    .catch((error) =>  console.log(error.message));

mongoose.set('useFindAndModify', false);
