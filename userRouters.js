import express, { query } from "express";
import userController from "../controllers/userControllers.js";
import bodyParser from 'body-parser';

const encoder = bodyParser.urlencoded();

const router = express.Router();

router.get("/home", userController.view);

router.get("/", (req, res) => {
    res.render('login');
})
router.get("/home", (req, res) => {
    res.render('home');
})

router.post("/register", userController.register)

router.post('/', encoder, userController.login)

export default router;