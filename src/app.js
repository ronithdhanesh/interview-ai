const express = require("express")
const authRouter = require("./routes/auth.routes")

const app = express();

app.use("/api/auth",authRouter)


app.get("/", (req,res)=>{
    res.send("Home page")
})


module.exports = app;