const express=require("express")

const {protectRoute} =require("../middleware/protectRoute")
const { handleCreateNote, handleDeleteNote, handleFetchNotes } = require("../controller/note.controller")

const router=express.Router()

router.post("/create",protectRoute,handleCreateNote)
router.delete("/delete/:id",protectRoute,handleDeleteNote)
router.get("/fetch",protectRoute,handleFetchNotes)


module.exports=router    