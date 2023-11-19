import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

import { userRouter } from "./routes/auth.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors()); 

app.get('/', (req, res) => {
    res.send("This is a book recipe app")
})

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

const PORT = 3001
const DATABASE_URL= process.env.DB_URL

mongoose.connect(DATABASE_URL)
    .then(() => app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })) 
    .catch((err) => console.log(err.message))
    