import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DashboardProvider } from "./context/DashboardContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AddWorkout from "./pages/AddWorkout";
import UpdateWeight from "./pages/UpdateWeight";

function App() {
  return (
    <BrowserRouter>
      <DashboardProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-workout" element={<AddWorkout />} />
          <Route path="/update-weight" element={<UpdateWeight />} />
        </Routes>
      </DashboardProvider>
    </BrowserRouter>
  );
}

export default App;