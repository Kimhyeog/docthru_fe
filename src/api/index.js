import * as auth from "./auth";
import * as user from "./user";
import * as work from "./work";
import * as challenge from "./challenge";
import * as feedback from "./feedback";
import * as admin from "./admin";
import * as notification from "./notification";

const { default: axios } = require("axios");

const baseURL = "http://localhost:5000";
// const baseURL = "https://docthru-be-5u42.onrender.com";
export const client = axios.create({
  baseURL,
});

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

const api = {
  auth,
  user,
  work,
  challenge,
  feedback,
  admin,
  notification,
};

export default api;
