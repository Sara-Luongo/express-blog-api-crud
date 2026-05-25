import express, { json } from 'express';
import postsRouter from './routes/postsRoutes.js';

const app = express();
const port = process.env.NUMBER_PORT || 3000;



app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded());

//collegamento rotte
app.use('/posts', postsRouter)



app.listen(port, (error => {
    if (error) {
        console.error(error);
    } else {
        console.log(`sei in ascolto sulla porta ${port}`)
    }
}));