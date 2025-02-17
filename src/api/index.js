const { default: axios } = require("axios");

const baseURL = "http://localhost:5000";

export const client = axios.create({
  baseURL,
});

const signUp = async (dto) => {
  const url = "/auth/signUp";
  const response = await client.post(url, dto);
  const data = response.data;
  return data;
};

const logIn = async (dto) => {
  const url = "/auth/logIn";
  const response = await client.post(url, dto);
  const data = response.data;

  const { accessToken, refreshToken } = data;
  client.defaults.headers.Authorization = `Bearer ${accessToken}`;
  localStorage.setItem("refreshToken", refreshToken);

  return data;
};

const api = {
  signUp,
  logIn,
};

export default api;
