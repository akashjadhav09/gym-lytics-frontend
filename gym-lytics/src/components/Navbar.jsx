import { Link, useLocation } from "react-router-dom";
import { Dumbbell } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const navLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-[#609af8] text-white"
        : "bg-[#455a73] text-gray-200 hover:bg-[#526b8a]"
    }`;
  };

  return (
    <div className="bg-[#36475d] text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-2">
        <Dumbbell className="text-gray-300 w-7 h-7" />
        <h1 className="text-xl font-semibold tracking-wide text-gray-100">Gym Workout Tracker</h1>
      </div>
      <div className="space-x-3 flex">
        <Link to="/dashboard" className={navLinkClass("/dashboard")}>
          Dashboard
        </Link>
        <Link to="/add-workout" className={navLinkClass("/add-workout")}>
          Add Workout
        </Link>
        <Link to="/update-weight" className={navLinkClass("/update-weight")}>
          Update Weight
        </Link>
      </div>
    </div>
  );
}