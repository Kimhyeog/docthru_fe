import { client } from "../client";

const setTokens = (accessToken, refreshToken) => {
  client.defaults.headers.Authorization = `Bearer ${accessToken}`;
  localStorage.setItem("refreshToken", refreshToken);
};

const signUp = async (dto) => {
  const url = "/auth/signUp";
  const response = await client.post(url, dto);
  const data = response.data;

  const { accessToken, refreshToken } = data;
  setTokens(accessToken, refreshToken);

  return data;
};

const logIn = async (dto) => {
  const url = "/auth/logIn";
  const response = await client.post(url, dto);
  const data = response.data;

  const { accessToken, refreshToken } = data;
  setTokens(accessToken, refreshToken);

  return data;
};

const refreshToken = async (prevRefreshToken) => {
  const url = "/auth/refreshToken";
  const response = await client.post(url, {
    refreshToken: prevRefreshToken,
  });
  const data = response.data;
  const { accessToken, refreshToken: newRefreshToken } = data;
  setTokens(accessToken, newRefreshToken);
  return data;
};

export { signUp, logIn, refreshToken };
