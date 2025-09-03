
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";



const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { name: "User", email: "user@example.com" };
  })


 
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("/api/notes", { withCredentials: true });
        setNotes(res.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error.response?.data || error.message);
      }
    };
    fetchNotes();
  }, []);

  // Create a new note
  const handleCreateNote = async () => {
    if (!newNote.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/note/create",
        { body: newNote },
        { withCredentials: true }
      );
      setNotes((prev) => [res.data.note, ...prev]);
      setNewNote("");
    } catch (error) {
      alert(error.response?.data?.error || "Failed to create note");
      console.error("Error creating note:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`/api/note/delete/${id}`, { withCredentials: true });
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      alert(error.response?.data?.error || "Failed to delete note");
      console.error("Error deleting note:", error.response?.data || error.message);
    }
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
      return;
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  

  return (
    <div className="max-w-md mx-auto border border-gray-300 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
                  <AiOutlineLoading3Quarters className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold">Dashboard</span>
                </div>
        <button
      onClick={handleSignOut}
      className="text-blue-600 text-sm font-semibold hover:underline"
    >
      Sign Out
    </button>
      </div>

      {/* Welcome Box */}
      <div className="border border-blue-500 rounded-md p-4 mb-4">
        <h2 className="font-bold mb-1">Welcome, {user.user.name}!</h2>
        <p className="text-sm">Email: {user.user.email}</p>
      </div>

      {/* Create Note */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Write a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreateNote}
          disabled={loading}
          className="bg-blue-600 text-white px-4 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Add"}
        </button>
      </div>

      {/* Notes List */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">Notes</label>
        {notes.length === 0 ? (
          <p className="text-sm text-gray-500">No notes yet.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="flex items-center justify-between bg-white border border-gray-300 rounded-md p-3 mb-2 shadow-sm"
            >
              <span>{note.body}</span>
              <button
                onClick={() => handleDeleteNote(note._id)}
                className="text-gray-600 hover:text-red-600"
                aria-label="Delete Note"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
