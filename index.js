import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import userRoutes from './routers/userRouters.js';


const app = express();
const __dirname = path.resolve();
const port = process.env.PORT;

dotenv.config();

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: false,
    layoutsDir: 'src'
}))

app.set('view engine', 'hbs');

app.use(express.json());
app.use("/", userRoutes);
app.use("/home", userRoutes);
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(port || 3000, () => {
    console.log("Servrer Started...")
})
