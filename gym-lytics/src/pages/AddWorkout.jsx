import { Link } from "react-router-dom";
import { ArrowLeft, PlusCircle, Calendar} from "lucide-react";

export default function AddWorkout() {
  return (
    <div className="min-h-screen bg-[#252933] flex items-center justify-center p-6 text-gray-200">
      <div className="bg-[#1c222b] rounded-xl shadow-2xl w-full max-w-[400px] overflow-hidden flex flex-col border border-gray-700/50">
        
        {/* Header Image Area */}
        <div className="relative h-28 bg-black">
          {/* Faking a background image since we don't have assets */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
            <div className="w-full h-full opacity-30 bg-center bg-cover" 
                 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop')" }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c222b] to-transparent"></div>
          </div>
          
          <div className="absolute inset-0 p-4 flex items-start">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors mr-3 mt-0.5">
              <ArrowLeft className="w-5 h-5 font-bold" />
            </Link>
            <div className="flex items-center space-x-2 text-white font-bold text-lg">
              <PlusCircle className="w-5 h-5" />
              <span>Add Workout</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400">Workout Type</label>
            <div className="relative">
              <select className="w-full bg-[#202631] border border-gray-600 rounded-lg p-2.5 text-sm outline-none appearance-none cursor-pointer">
                <option>Strength Training</option>
                <option>Cardio</option>
                <option>Flexibility</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400">Exercise Name</label>
            <input
              className="w-full bg-[#202631] border border-gray-600 rounded-lg p-2.5 text-sm outline-none placeholder-gray-500"
              placeholder="Enter exercise name..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400">Sets</label>
              <input className="w-full bg-[#202631] border border-gray-600 rounded-lg p-2.5 text-sm outline-none" defaultValue="3" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400">Reps</label>
              <input className="w-full bg-[#202631] border border-gray-600 rounded-lg p-2.5 text-sm outline-none" defaultValue="10" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400">Weight (kg)</label>
              <input className="w-full bg-[#202631] border border-gray-600 rounded-lg p-2.5 text-sm outline-none" defaultValue="50" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400">Rest (sec)</label>
              <input className="w-full bg-[#202631] border border-gray-600 rounded-lg p-2.5 text-sm outline-none" defaultValue="60" />
            </div>
          </div>

          <button className="w-full bg-[#202631] border border-gray-600 text-gray-400 text-xs font-medium p-2.5 rounded-lg flex items-center justify-center space-x-1 hover:bg-[#28303d] transition-colors">
            <span className="text-lg leading-none mt-[-2px]">+</span> <span>Add Another Set</span>
          </button>

          <div className="flex items-center space-x-3 bg-[#202631] border border-gray-600 rounded-lg p-2.5 text-sm mt-2">
             <span className="text-gray-400 font-semibold w-10">Date</span>
             <input type="text" className="flex-1 bg-transparent outline-none text-white font-medium" defaultValue="April 18, 2024" />
             <Calendar className="w-4 h-4 text-gray-400" />
          </div>

          <input
            className="w-full bg-[#202631] border border-gray-600 rounded-lg p-3 text-sm outline-none placeholder-gray-500"
            placeholder="Add any notes..."
          />
        </div>

        {/* Footer Buttons */}
        <div className="p-4 pt-2 flex space-x-3">
          <Link to="/" className="flex-1 text-center bg-[#353b47] hover:bg-[#434b5a] text-gray-200 font-medium py-2.5 rounded-lg transition-colors text-sm">
            Cancel
          </Link>
          <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-medium py-2.5 rounded-lg shadow-lg transition-colors text-sm border-t border-orange-400/30">
            Save Workout
          </button>
        </div>

      </div>
    </div>
  );
}