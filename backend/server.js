const path=require('path')
const express =require("express")
const app =express()    
const dontenv =require("dotenv")
const cookieParser = require("cookie-parser")
const connectToMOngo = require("./db/connecToMongo")
dontenv.config()

const Port=process.env.PORT || 8000

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

const authroutes=require("./routes/auth.routes")
const noteroutes=require("./routes/note.routes")
const otproutes=require("./routes/otp.routes")

app.use("/api/auth",authroutes)
app.use("/api/note",noteroutes)
app.use("/api/otp",otproutes)




app.use(express.static(path.join(__dirname, "../frontend/dist")));


app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});




app.listen(Port,()=>{
    connectToMOngo()
    console.log(`Your app is running on port ${Port}`)
})