// import {  Routes, Route, Navigate } from "react-router-dom";
// import './App.css';
// import SignUp from './components/Signup';
// import SignIn from './components/Signin';
// import Dashboard from './components/Dashboard';
// import { Toaster } from 'react-hot-toast';

// function App() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//       <>
//       <Toaster />
//       <Routes>
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<SignIn />} />
//         <Route
//           path="/dashboard"
//           element={user ? <Dashboard /> : <Navigate to="/login" />}
//           />
//         <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
//       </Routes>
//       </>
//   );
// }

// export default App;
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import Dashboard from './components/Dashboard';
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  // Sync user state with localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/login" element={<SignIn setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
