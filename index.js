const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const clientRouter  = require("./router/client_router");
const authRouter    = require("./router/Auth_router");
const userRouter    = require("./router/user_router");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended : true
}))

// router caller
app.use("/api/client",clientRouter);
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter)

mongoose.connect(process.env.MONGO_DB)
    .then(()=> {
        console.log("db started");
        app.listen(process.env.PORT || 3000, () =>{
            console.log("app started")
        })
    })
    .catch((e)=>{
        console.log(e);
        console.log("db failed to connect")
    })


