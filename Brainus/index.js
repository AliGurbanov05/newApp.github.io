import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { engine } from 'express-handlebars';
import userRoutes from './routers/userRouters.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: false,
    layoutsDir: 'src'
}));

app.set('view engine', 'hbs');

app.use(express.json());
app.use("/", userRoutes);
app.use("/login", userRoutes);
app.use("/tap", userRoutes);
app.use("/home", userRoutes);
app.use("/users", userRoutes);
app.use("/register", userRoutes);
app.use("/products", userRoutes);
app.use("/complaint", userRoutes);
app.use("/complaints", userRoutes);
app.use("/warehouses", userRoutes);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));

app.listen(port || 3000, () => {
    console.log("Servrer Started on port " + port);
});
