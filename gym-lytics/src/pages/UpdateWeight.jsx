import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Scale, Calendar } from "lucide-react";
import { useState, useRef } from "react";

import Navbar from "../components/Navbar";
import { addWeight } from "../api/weight.api";

export default function UpdateWeight() {
  const [weight, setWeight] = useState("81.0");
  const [date, setDate] = useState("2024-04-18");
  const dateRef = useRef(null);
  const navigate = useNavigate();


  const handleWeightChange = async (e) => {
    try {
      const value = e.target.value;
      if (/^\d*\.?\d{0,2}$/.test(value)) {
        setWeight(value);
      }

      const payload = {
        weight : Number(weight),
        date
      }
      await addWeight(payload);
      
      alert("Weight Updated");
      navigate("/dashboard");
    } catch (error) {
      console.alert("Error While Update Weight, Retry")
    }
  };

  const handleUpdateWeight = async ()=>{
    try {
      const payload = {
        weight : Number(weight),
        date
      }
      await addWeight(payload);
      
      alert("Weight Updated");
      navigate("/dashboard");
    } catch (error) {
      console.alert("Error While Update Weight, Retry")
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#252933] flex items-center justify-center p-6 text-gray-200">
        <div className="bg-[#1c222b] rounded-xl shadow-2xl w-full max-w-[360px] flex flex-col border border-gray-700/50">

          {/* Header */}
          <div className="p-4 flex items-center space-x-4 border-b border-gray-800">
            <Link to="/dashboard" className="text-gray-300 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h2 className="text-lg font-bold text-white flex-1 text-center pr-9">
              Update Weight
            </h2>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col items-center">

            {/* Icon */}
            <div className="w-24 h-24 mb-4 rounded-xl relative flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 shadow-inner border border-gray-600">
              <Scale className="w-12 h-12 text-gray-300" />
              <div className="absolute -bottom-1 -right-1 text-2xl">🔥</div>
            </div>

            {/* Current Weight */}
            <div className="text-sm text-gray-400 font-semibold mb-1">
              Current Weight
            </div>
            <div className="text-4xl font-bold text-white mb-5">
              82.5<span className="text-xl ml-1 text-gray-300">kg</span>
            </div>

            <div className="w-full h-px bg-gray-700/60 mb-5"></div>

            {/* 📅 Date Section */}
            <div className="w-full mb-5">
              <div className="text-sm text-gray-400 font-semibold mb-2">
                Select Date
              </div>

              <div
                onClick={() => dateRef.current?.showPicker()}
                className="relative flex items-center justify-between bg-[#202631] border border-gray-600 rounded-lg px-3 py-2.5 cursor-pointer hover:border-gray-500 transition"
              >
                <span className="text-white font-medium">
                  {new Date(date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>

                <Calendar className="w-4 h-4 text-gray-400" />

                {/* Hidden Date Input */}
                <input
                  ref={dateRef}
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Weight Section */}
            <div className="w-full mb-2">
              <div className="text-left text-sm text-gray-400 font-semibold mb-2 text-center">
                Enter New Weight
              </div>

              <div className="bg-[#202631] border border-gray-600 rounded-lg p-3 flex justify-center items-center">
                <input
                  type="text"
                  value={weight}
                  onChange={handleWeightChange}
                  placeholder="0"
                  className="text-3xl font-bold text-white bg-transparent text-center w-full outline-none"
                />
                <span className="text-lg text-gray-400 ml-1">kg</span>
              </div>
            </div>

            {/* Slider */}
            <div className="w-full mt-4 px-1">
              <input
                type="range"
                min="30"
                max="150"
                step="0.1"
                value={weight === "" ? 0 : weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />

              <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                <span>30</span>
                <span>60</span>
                <span>90</span>
                <span>120</span>
                <span>150</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 pt-0 flex space-x-3">
            <Link
              to="/dashboard"
              className="flex-1 text-center bg-[#353b47] hover:bg-[#434b5a] py-2.5 rounded-lg text-sm"
            >
              Cancel
            </Link>

            <button
              disabled={!weight}
              onClick={handleUpdateWeight}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 py-2.5 rounded-lg text-sm disabled:opacity-50"
            >
              Update Weight
            </button>
          </div>

        </div>
      </div>
    </>
  );
}