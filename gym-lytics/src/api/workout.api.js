import API from "./axios";

export const addWorkout = (data) => API.post("/workouts", data);
export const getWorkouts = () => API.get("/workouts");
