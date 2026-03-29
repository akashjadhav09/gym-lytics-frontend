import { createContext, useContext, useEffect, useState } from "react";
import { getWeight } from "../api/weight.api";
import { getWorkouts } from "../api/workout.api";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    stats: {
      weight: 0,
      workouts: 0,
      calories: 0,
    },
    charts: {
      weightProgress: [],
      strengthProgress: [],
      category: [],
    },
    lists: {
      recentWorkouts: [],
    },
  });

  const fetchDashboard = async () => {
    try {
        setLoading(true);

        const [weightRes, workoutRes] = await Promise.all([
        getWeight(),
        getWorkouts(),
        ]);

        // ✅ FIXED (axios response)
        const weightJson = weightRes.data;
        const workoutJson = workoutRes.data;

        const weights = weightJson.data || [];
        const workouts = workoutJson.data || [];

        // ✅ Latest Weight
        const latest = [...weights].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];

        // ✅ Monthly Workouts
        const now = new Date();
        const monthlyWorkouts = workouts.filter((w) => {
        const d = new Date(w.date);
        return (
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
        );
        });

        // ✅ Weight Chart
        const weightProgress = weights.map((w) => ({
        date: new Date(w.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
        }),
        weight: w.weight,
        }));

        // ✅ Category
        const categoryMap = {};
        workouts.forEach((w) => {
        const type = w.workoutType || "Other";
        categoryMap[type] = (categoryMap[type] || 0) + 1;
        });

        const category = Object.keys(categoryMap).map((key) => ({
        name: key,
        value: categoryMap[key],
        }));

        // ✅ Recent Workouts
        const recentWorkouts = workouts
        .slice(-5)
        .reverse()
        .map((w) => ({
            date: new Date(w.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            }),
            title: w.exercises?.[0]?.name || "Workout",
            details: `${w.exercises?.[0]?.sets?.length || 0} sets`,
        }));

        setData({
        stats: {
            weight: latest?.weight || 0,
            workouts: monthlyWorkouts.length,
            calories: workouts.reduce((a, w) => a + (w.calories || 0), 0),
        },
        charts: {
            weightProgress,
            strengthProgress: [],
            category,
        },
        lists: {
            recentWorkouts,
        },
        });

    } catch (err) {
        console.error("Dashboard Error:", err);
    } finally {
        setLoading(false);
    }
    };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <DashboardContext.Provider value={{ data, loading, refresh: fetchDashboard }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);