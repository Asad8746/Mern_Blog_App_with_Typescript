import express from "express";
import { Router } from "./Router";
import mongoose from "mongoose";
import cors from "cors";
import "./controllers/AuthController"
import "./controllers/BlogController"
import "./controllers/UserController";
import { errorMiddleware } from "./middlewares";

const app = express();
app.use(cors({
    exposedHeaders: "Authorization"
}))
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

