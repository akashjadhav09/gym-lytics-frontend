import API from "./axios";

export const addWeight = (data) => API.post("/weight", data);
export const getWeight = () => API.get("/weight");
