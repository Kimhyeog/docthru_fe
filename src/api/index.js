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

const refreshToken = async (prevRefreshToken) => {
  const url = "/auth/refreshToken";
  const response = await client.post(url, {
    refreshToken: prevRefreshToken,
  });
  const data = response.data;
  const { accessToken, refreshToken: newRefreshToken } = data;
  client.defaults.headers.Authorization = `Bearer ${accessToken}`;
  localStorage.setItem("refreshToken", newRefreshToken);
  return data;
};

const getUserMe = async () => {
  const url = "/users/me";
  const response = await client.get(url);
  const data = response.data;
  return data;
};

const getChalleges = async (page = 1) => {
  const url = `/challenges/?page=${page}`;
  const response = await client.get(url);
  const data = response.data;
  return data;
};

const api = {
  signUp,
  logIn,
  getUserMe,
  refreshToken,
  getChalleges,
};

export default api;
