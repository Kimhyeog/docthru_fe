const { default: axios } = require("axios");

const baseURL = "http://localhost:5000";
// const baseURL = "https://docthru-be-5u42.onrender.com";
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
const getUserData = async (userId) => {
  const url = `/users/${userId}`;
  const response = await client.get(url);
  const data = response.data;
  return data;
};

const getWork = async (workId) => {
  const url = `/works/${workId}`;
  const response = await client.get(url);
  const data = response.data;
  return data;
};

const deleteWork = async (workId) => {
  const url = `/works/${workId}`;
  const response = await client.delete(url);
  const data = response.data;
  return data;
};

const getChallenge = async (challengeId) => {
  const url = `/challenges/${challengeId}`;
  const response = await client.get(url);
  const data = response.data;
  return data;
};

const getWorks = async (challengeId, cursor) => {
  let url = `/works/${challengeId}/many`;
  if (cursor) {
    url += `?cursor=${cursor}`;
  }
  const response = await client.get(url);
  const data = response.data;
  return data;
};

const createLike = async (workId) => {
  const url = `/works/${workId}/like`;
  const response = await client.post(url);
  const data = response.data;
  return data;
};

const deleteLike = async (workId) => {
  const url = `/works/${workId}/like`;
  const response = await client.delete(url);
  const data = response.data;
  return data;
};

const getFeedbacks = async (workId) => {
  const url = `/works/${workId}/feedback`;
  const response = await client.get(url);
  const data = response.data;
  return data;
};

const createFeedback = async (workId, content) => {
  const url = `/works/${workId}/feedback`;
  const response = await client.post(url, { content });
  const data = response.data;
  return data;
};

const deleteFeedback = async (feedbackId) => {
  const url = `/feedback/${feedbackId}`;
  const response = await client.delete(url);
  const data = response.data;
  return data;
};

const updateFeedback = async (feedbackId, content) => {
  const url = `/feedback/${feedbackId}`;
  const response = await client.put(url, { content });
  const data = response.data;
  return data;
};

// 유동적인 GET 요청 함수
const getChallenges = async ({
  keyword,
  docType,
  progress,
  page = 1,
  field,
} = {}) => {
  const params = {};

  if (keyword) params.keyword = keyword;
  if (docType) params.docType = docType;
  if (progress) params.progress = progress;
  if (field) params.field = field;
  params.page = page;

  console.log("📌 API 요청 params:", params); // 추가된 로그

  try {
    const response = await client.get("/challenges", { params });
    return response.data;
  } catch (error) {
    console.error(
      "🔥 getChallenges API 요청 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const api = {
  signUp,
  logIn,
  getUserMe,
  refreshToken,
  getWork,
  getChallenge,
  getUserData,
  getWorks,
  createLike,
  deleteLike,
  getFeedbacks,
  createFeedback,
  getChallenges,
  deleteFeedback,
  updateFeedback,
  deleteWork,
};

export default api;
