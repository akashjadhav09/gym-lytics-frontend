import { Link } from "react-router-dom";
import { ArrowLeft, Scale } from "lucide-react";

export default function UpdateWeight() {
  return (
    <div className="min-h-screen bg-[#252933] flex items-center justify-center p-6 text-gray-200">
      <div className="bg-[#1c222b] rounded-xl shadow-2xl w-full max-w-[360px] overflow-hidden flex flex-col border border-gray-700/50">
        
        {/* Header */}
        <div className="p-4 flex items-center space-x-4 border-b border-gray-800">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 font-bold" />
          </Link>
          <h2 className="text-lg font-bold text-white flex-1 text-center pr-9">Update Weight</h2>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col items-center">
          
          <div className="w-24 h-24 mb-4 rounded-xl relative flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 shadow-inner border border-gray-600">
            <Scale className="w-12 h-12 text-gray-300" />
            <div className="absolute -bottom-1 -right-1 text-2xl">🔥</div>
          </div>

          <div className="text-sm text-gray-400 font-semibold mb-1">Current Weight</div>
          <div className="text-4xl font-bold text-white mb-6">
            82.5<span className="text-xl ml-1 text-gray-300">kg</span>
          </div>

          <div className="w-full h-px bg-gray-700/60 mb-6"></div>

          <div className="text-sm text-gray-400 font-semibold mb-2">Enter New Weight</div>
          
          <div className="w-full bg-[#202631] border border-gray-600 rounded-lg p-3 flex justify-center items-center mb-6">
             <span className="text-3xl font-bold text-white">81.0</span>
             <span className="text-lg text-gray-400 font-medium ml-1 mt-1">kg</span>
          </div>

          <div className="w-full relative mb-8 px-2">
            <input 
              type="range" 
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-orange-500" 
              min="78" 
              max="86" 
              defaultValue="81" 
            />
            <div className="flex justify-between text-xs text-gray-500 font-medium mt-2 px-1">
              <span>78</span>
              <span>80</span>
              <span>81</span>
              <span>82</span>
              <span>84</span>
              <span>86</span>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-5 pt-0 flex space-x-3 bg-[#1c222b]">
          <Link to="/" className="flex-1 text-center bg-[#353b47] hover:bg-[#434b5a] text-gray-200 font-medium py-2.5 rounded-lg transition-colors text-sm">
            Cancel
          </Link>
          <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-medium py-2.5 rounded-lg shadow-lg transition-colors text-sm border-t border-orange-400/30">
            Update Weight
          </button>
        </div>

      </div>
    </div>
  );
}