const Note =  require("../models/note")
const User =require("../models/user")

const handleCreateNote = async (req, res) => {
    try {
        const { title, body } = req.body;

        if (!body) {
            return res.status(400).json({ error: "Note body is required" });
        }

        const note = await Note.create({
            user: req.user._id,  
            body,
        });

        res.status(201).json({
            message: "Note created successfully",
            note,
        });
    } catch (error) {
        console.error("Error creating note:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
const handleDeleteNote = async (req, res) => {
  try {
    const noteId = req.params.id; 

    const note = await Note.findOneAndDelete({
      _id: noteId,
      user: req.user._id 
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found or not authorized" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleFetchNotes = async (req, res) => {
  try {
    const userId = req.user._id; 

    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

module.exports={handleCreateNote,handleDeleteNote,handleFetchNotes}