import express from "express";
import { Router } from "./Router";
import mongoose from "mongoose";
import "./models"
import "./controllers/LoginController"
import "./controllers/BlogController"
import { errorMiddleware } from "./middlewares";

const app = express();
app.use(express.json())
app.use(Router.getRouter());
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`)
});

mongoose.connect("mongodb://localhost/Blogs").then(() => {
    console.log("Connected to mongodb")
})

//auth Routes (Login,register);
// Blogs Routes (Get Blogs,get Blog,post Blog,put)

