import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function Dashboard() {
  const [weightData, setWeightData] = useState([]);
  const [strengthData, setStrengthData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  // Dummy data matching UI
  useEffect(() => {
    setWeightData([
      { date: "Apr 10", weight: 70 },
      { date: "Apr 15", weight: 71.8 },
      { date: "Apr 20", weight: 72.8 },
      { date: "Apr 25", weight: 74 },
      { date: "Apr 30", weight: 75.2 },
    ]);

    setStrengthData([
      { date: "Apr 10", weight: 54 },
      { date: "Apr 15", weight: 58 },
      { date: "Apr 20", weight: 62 },
      { date: "Apr 25", weight: 68 },
      { date: "Apr 30", weight: 74 },
    ]);

    setCategoryData([
      { name: "Chest", value: 30 },
      { name: "Back", value: 25 },
      { name: "Legs", value: 25 },
      { name: "Arms", value: 20 },
    ]);
  }, []);

  const COLORS = ["#f28123", "#307cf6", "#68af4b", "#6a4a98"]; // Matching the pie chart colors roughly

  return (
    <div className="bg-[#f0f3f8] min-h-screen text-[#313f56]">
      <Navbar />

      <div className="p-6 max-w-[1400px] mx-auto space-y-6 pt-8">
        {/* Top Cards */}
        <div className="flex gap-6 w-full">
          <StatCard title="Today's Weight" value="75.4 kg" sub="Current Weight" />
          <StatCard title="Total Workouts" value="156" sub="Workouts Logged" />
          <StatCard title="Calories Burned" value="720 kcal" sub="Calories Burned" />
        </div>

        {/* Bottom Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column (Charts) */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 h-auto">
              {/* Weight Progress */}
              <div className="bg-white rounded-lg shadow-sm w-full md:w-3/5 overflow-hidden flex flex-col border border-gray-100">
                <div className="bg-[#5c8ed7] text-white px-4 py-3 font-medium">
                  Weight Progress
                </div>
                <div className="p-4 flex-1">
                  <div className="text-sm text-gray-500 mb-2">Weight (kg)</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={weightData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#5c8ed7" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#5c8ed7" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#e5e7eb" />
                      <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6b7280' }} tickMargin={10} axisLine={false} tickLine={false} />
                      <YAxis domain={[68, 76]} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area type="linear" dataKey="weight" stroke="#5c8ed7" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" dot={{ r: 5, fill: "#5c8ed7", strokeWidth: 2, stroke: "#fff" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Workout Distribution */}
              <div className="bg-white rounded-lg shadow-sm w-full md:w-2/5 overflow-hidden flex flex-col border border-gray-100">
                <div className="bg-[#65af4f] text-white px-4 py-3 font-medium">
                  Workout Distribution
                </div>
                <div className="p-4 flex-1 flex justify-center items-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={0}
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                          const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                          const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                          const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                          return (
                            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-sm font-bold">
                              {`${(percent * 100).toFixed(0)}%`}
                            </text>
                          );
                        }}
                        labelLine={false}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Strength Progress */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#607187] text-white px-4 py-3 font-medium">
                Strength Progress
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-2">Bench Press Weight Over Time</div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={strengthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorStrength" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f28123" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f28123" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#e5e7eb" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6b7280' }} tickMargin={10} axisLine={false} tickLine={false} />
                    <YAxis domain={[40, 80]} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="linear" dataKey="weight" stroke="#f28123" strokeWidth={3} fillOpacity={1} fill="url(#colorStrength)" dot={{ r: 5, fill: "#f28123", strokeWidth: 2, stroke: "#fff" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column (Recent Workouts) */}
          <div className="w-full lg:w-[320px] bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col h-auto">
            <div className="bg-[#607187] text-white px-4 py-3 font-medium">
              Recent Workouts
            </div>
            <div className="p-2 space-y-1">
              <WorkoutItem date="Apr 25" title="Chest Press" details="3 Sets x 8 Reps - 60 kg" color="bg-[#607187]" />
              <WorkoutItem date="Apr 24" title="Squats" details="4 Sets x 10 Reps - 80 kg" color="bg-[#8cc63f]" />
              <WorkoutItem date="Apr 23" title="Lat Pulldown" details="3 Sets x 12 Reps - 55 kg" color="bg-[#29aae2]" />
              <WorkoutItem date="Apr 22" title="Bicep Curls" details="3 Sets x 15 Reps - 20 kg" color="bg-[#f26522]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, sub }) {
  // Parsing the value to make unit smaller if needed
  const valParts = value.split(' ');
  const mainVal = valParts[0];
  const unit = valParts[1] || '';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex-1 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <h3 className="text-[#607187] font-semibold mb-4 text-[15px]">{title}</h3>
      <div className="w-3/4 h-[1px] bg-gray-200 mb-4"></div>
      <div className="flex items-baseline mb-4">
        <span className="text-5xl font-bold text-[#2a3036] tracking-tight">{mainVal}</span>
        {unit && <span className="text-xl font-bold text-[#2a3036] ml-1">{unit}</span>}
      </div>
      <div className="w-3/4 h-[1px] bg-gray-200 mb-3"></div>
      <p className="text-gray-500 text-sm">{sub}</p>
    </div>
  );
}

function WorkoutItem({ date, title, details, color }) {
  return (
    <div className="p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-2 mb-2">
        <div className={`w-3 h-3 ${color} rounded-sm`}></div>
        <span className="text-sm font-semibold text-[#5c6978]">{date}</span>
      </div>
      <h4 className="font-bold text-[#354359] text-[15px] pl-5">{title}</h4>
      <p className="text-[#727d8f] text-sm pl-5 mt-0.5">{details}</p>
    </div>
  );
}
