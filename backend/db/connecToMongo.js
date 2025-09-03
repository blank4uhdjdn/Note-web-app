const mongoose =require("mongoose")
const connectToMOngo =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("connected to mongodb")
        
    } catch (error) {
            console.log(`error in connecting to mongodb ${error}`)
    }
}

module.exports=connectToMOngo