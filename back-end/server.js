import express from 'express';
import {booksRoutes} from "./routes/booksRoutes.js";
import mongoose from "mongoose";

const app = express()

app.use(express.json())

app.use('/api/books', booksRoutes);

mongoose.connect("mongodb://localhost:27017", { dbName: 'barn9din_db'})
    .then(() => {
        console.log("connect to DB successfully")
        app.listen(4000, 'localhost', () => console.log("Listening to port 4000"))
    })
    .catch((err) => console.log(err));

