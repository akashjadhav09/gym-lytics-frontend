import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddWorkout from "./pages/AddWorkout";
import UpdateWeight from "./pages/UpdateWeight";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-workout" element={<AddWorkout />} />
        <Route path="/update-weight" element={<UpdateWeight />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;