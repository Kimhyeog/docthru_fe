import axios from "axios";
const baseURL = "http://localhost:5000";
// const baseURL = "https://docthru-be-5u42.onrender.com";
export const client = axios.create({ baseURL });
