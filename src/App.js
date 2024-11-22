import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Leaderboard from "./pages/Leaderboard";
import MemberDetails from "./pages/MemberDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
              <Route path="/member/:id" element={<MemberDetails />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
