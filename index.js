const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {dbConfig} = require("./utils/utils");

const clientRouter  = require("./router/client_router");
const authRouter    = require("./router/Auth_router");
const userRouter    = require("./router/user_router");
const adminRouter   = require("./router/Admin_router");
const cors = require("cors");

const app = express();

app.use(cors({
	origin: "*",
	credentials : true
}))
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended : true
}))

// router caller
app.use("/api/client",clientRouter);
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/admin",adminRouter);

mongoose.connect(dbConfig())
    .then(()=> {
        console.log("db started");
        app.listen(process.env.PORT || 5000, () =>{
            console.log("app started")
        })
    })
    .catch((e)=>{
        console.log(e);
        console.log("db failed to connect")
    })


