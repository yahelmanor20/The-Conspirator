require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connect to the datebase"));

app.use(cors());
app.use(express.json());
const conspiracyRouter = require("./routes/conspiracyRouter");
app.use("/conspiracies", conspiracyRouter);

app.listen(process.env.PORT, () =>{
    console.log(`Server running on port ${process.env.PORT}`);
})