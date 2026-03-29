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

import Navbar from "../components/Navbar";
import { useDashboard } from "../context/DashboardContext";

export default function Dashboard() {
  const { data, loading } = useDashboard();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const { stats, charts, lists } = data;

  const COLORS = ["#f28123", "#307cf6", "#68af4b", "#6a4a98"];

  return (
    <div className="bg-[#f0f3f8] min-h-screen text-[#313f56]">
      <Navbar />

      <div className="p-6 max-w-[1400px] mx-auto space-y-6 pt-8">

        {/* ✅ Top Cards */}
        <div className="flex gap-6 w-full">
          <StatCard title="Today's Weight" value={`${stats.weight} kg`} sub="Current Weight" />
          <StatCard title="Total Workouts" value={`${stats.workouts}`} sub="Workouts Logged" />
          <StatCard title="Calories Burned" value={`${stats.calories} kcal`} sub="Calories Burned" />
        </div>

        {/* ✅ Layout */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Top Charts */}
            <div className="flex flex-col md:flex-row gap-6">

              {/* Weight Progress */}
              <div className="bg-white rounded-lg shadow-sm w-full md:w-3/5 border border-gray-100">
                <div className="bg-[#5c8ed7] text-white px-4 py-3 font-medium">
                  Weight Progress
                </div>

                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-2">Weight (kg)</div>

                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={charts.weightProgress || []}>
                      <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#5c8ed7" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#5c8ed7" stopOpacity={0} />
                        </linearGradient>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />

                      <Area
                        type="monotone"
                        dataKey="weight"
                        stroke="#5c8ed7"
                        fill="url(#colorWeight)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Workout Distribution */}
              <div className="bg-white rounded-lg shadow-sm w-full md:w-2/5 border border-gray-100">
                <div className="bg-[#65af4f] text-white px-4 py-3 font-medium">
                  Workout Distribution
                </div>

                <div className="p-4 flex justify-center items-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={charts.category || []}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                      >
                        {(charts.category || []).map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Strength Progress */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="bg-[#607187] text-white px-4 py-3 font-medium">
                Strength Progress
              </div>

              <div className="p-4">
                <div className="text-sm text-gray-500 mb-2">
                  Bench Press Weight Over Time
                </div>

                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={charts.strengthProgress || []}>
                    <defs>
                      <linearGradient id="colorStrength" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f28123" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f28123" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="weight"
                      stroke="#f28123"
                      fill="url(#colorStrength)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-[320px] bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="bg-[#607187] text-white px-4 py-3 font-medium">
              Recent Workouts
            </div>

            <div className="p-2 space-y-1">
              {(lists.recentWorkouts || []).length === 0 ? (
                <p className="text-sm text-gray-400 p-3">No workouts yet</p>
              ) : (
                lists.recentWorkouts.map((w, i) => (
                  <WorkoutItem key={i} {...w} />
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, sub }) {
  const [mainVal, unit] = value.split(" ");

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex-1 p-6 text-center">
      <h3 className="text-[#607187] font-semibold mb-4">{title}</h3>

      <div className="border-t border-gray-200 w-3/4 mx-auto mb-4" />

      <div className="flex justify-center items-end gap-1 mb-4">
        <span className="text-5xl font-bold text-[#2a3036]">{mainVal}</span>
        {unit && <span className="text-xl font-bold">{unit}</span>}
      </div>

      <div className="border-t border-gray-200 w-3/4 mx-auto mb-3" />

      <p className="text-gray-500 text-sm">{sub}</p>
    </div>
  );
}

function WorkoutItem({ date, title, details, color = "bg-gray-400" }) {
  return (
    <div className="p-3 border-b last:border-0 hover:bg-gray-50">
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-3 h-3 ${color} rounded-sm`} />
        <span className="text-sm font-semibold text-[#5c6978]">{date}</span>
      </div>

      <h4 className="font-bold text-[#354359] text-sm pl-5">{title}</h4>
      <p className="text-[#727d8f] text-xs pl-5">{details}</p>
    </div>
  );
}