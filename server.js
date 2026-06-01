require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connect to the datebase"));

app.use(express.json());
const usersRouter = require("./routes/conspiracyRouter");
app.use("/conspiracys", usersRouter);

app.listen(3000, () =>{
    console.log("start")
})