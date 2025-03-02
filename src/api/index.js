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

  const { accessToken, refreshToken } = data;
  client.defaults.headers.Authorization = `Bearer ${accessToken}`;
  localStorage.setItem("refreshToken", refreshToken);

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

const createChallenge = async (dto) => {
  const url = `/challenges`;
  const response = await client.post(url, dto);
  const data = response.data;
  return data;
};

const deleteChallenge = async (challengeId) => {
  const url = `/application/${challengeId}`;
  const response = await client.delete(url);
  const data = response.data;
  return data;
};

const updateChallenge = async (challengeId, dto) => {
  const url = `/challenges/${challengeId}`;
  const response = await client.put(url, dto);
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

const getTopLikeWorks = async (challengeId) => {
  let url = `/works/${challengeId}/topLike`;
  const response = await client.get(url);
  const data = response.data;
  return data;
};

const createWork = async (challengeId, description) => {
  let url = `/works/${challengeId}`;
  const response = await client.post(url, { description });
  const data = response.data;
  return data;
};

const updateWork = async (workId, description) => {
  let url = `/works/${workId}`;
  const response = await client.put(url, { description });
  const data = response.data;
  return data;
};

const saveWork = async (challengeId, description) => {
  let url = `/works/${challengeId}/save`;
  const response = await client.post(url, { description });
  const data = response.data;
  return data;
};

const getSavedWork = async (challengeId) => {
  let url = `/works/${challengeId}/save`;
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

//나의 챌린지 of 참여중인 챌린지 조회 GET 요철 함수

// 공통 함수로 통합 param 받아야함 type 3가지 그중 2가는 형주님
const getMyChallenges = async (type, keyword = "") => {
  const url = `/users/me/challenges/${type}${
    keyword ? `?keyword=${keyword}` : ""
  }`;
  const response = await client.get(url); // ?keyword=value 형식으로 URL에 전달
  const data = response.data;
  return data;
};

// api/index.js
const getApplications = async (
  option = "ApplyDeadlineDesc",
  pageSize = 10,
  keyword,
  page = 1
) => {
  const url = `/users/me/challenges/application`;
  const params = { option, pageSize, page };

  if (keyword) {
    params.keyword = keyword;
  }

  const prevRefreshToken = localStorage.getItem("refreshToken");
  if (!prevRefreshToken) {
    throw new Error("Unauthenticated");
  }

  try {
    await refreshToken(prevRefreshToken);

    const response = await client.get(url, {
      params,
      headers: {
        Authorization: client.defaults.headers.Authorization,
      },
    });

    // ✅ 응답 데이터가 예상한 형태인지 검증
    if (!response.data || !Array.isArray(response.data.challenges)) {
      console.warn("🚨 예상치 못한 응답 형식:", response.data);
      return { challenges: [] }; // 빈 배열 반환하여 오류 방지
    }

    return response.data;
  } catch (error) {
    console.error(
      "🔥 getApplications API 요청 실패:",
      error.response?.data || error.message || "알 수 없는 오류 발생"
    );

    if (error.response?.status === 401) {
      localStorage.removeItem("refreshToken");
      alert("인증이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/login";
    }

    return { challenges: [] }; // ✅ 에러 발생 시 빈 배열 반환 (이전 코드에서는 예외 발생 후 throw 했음)
  }
};

const participateChallenge = async (challengeId) => {
  const url = `/challenges/${challengeId}/participation`;
  const response = await client.post(url);
  const data = response.data;
  return data;
};

const deleteParticipate = async (challengeId) => {
  const url = `/challenges/${challengeId}/participation`;
  const response = await client.delete(url);
  const data = response.data;
  return data;
};

const deleteChallengeByAdmin = async (challengeId) => {
  const url = `/challenges/${challengeId}`;
  const response = await client.delete(url);
  const data = response.data;
  return data;
};

const getApplicationsByAdmin = async (
  option = "ApplyDeadlineDesc",
  pageSize = 10,
  keyword,
  page = 1
) => {
  const url = `/application`;
  const params = { option, pageSize, page };

  if (keyword) {
    params.keyword = keyword;
  }

  const prevRefreshToken = localStorage.getItem("refreshToken");
  if (!prevRefreshToken) {
    throw new Error("Unauthenticated");
  }

  try {
    await refreshToken(prevRefreshToken);

    const response = await client.get(url, {
      params,
      headers: {
        Authorization: client.defaults.headers.Authorization,
      },
    });

    // ✅ 응답 데이터가 예상한 형태인지 검증
    if (!response.data || !Array.isArray(response.data.challenges)) {
      console.warn("🚨 예상치 못한 응답 형식:", response.data);
      return { challenges: [] }; // 빈 배열 반환하여 오류 방지
    }

    return response.data;
  } catch (error) {
    console.error(
      "🔥 getApplications API 요청 실패:",
      error.response?.data || error.message || "알 수 없는 오류 발생"
    );

    if (error.response?.status === 401) {
      localStorage.removeItem("refreshToken");
      alert("인증이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/login";
    }

    return { challenges: [] }; // ✅ 에러 발생 시 빈 배열 반환 (이전 코드에서는 예외 발생 후 throw 했음)
  }
};

// ✅ 챌린지 거절 API
const rejectedChallengeByAdmin = async (challengeId, invalidationComment) => {
  if (!challengeId) {
    throw new Error("challengeId가 제공되지 않았습니다.");
  }

  const prevRefreshToken = localStorage.getItem("refreshToken");
  if (!prevRefreshToken) {
    throw new Error("Unauthenticated");
  }

  try {
    await refreshToken(prevRefreshToken);

    const response = await client.put(
      `/application/${challengeId}`,
      {
        status: "REJECTED",
        invalidationComment,
      },
      {
        headers: {
          Authorization: client.defaults.headers.Authorization,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "🔥 rejectedChallengeByAdmin API 요청 실패:",
      error.response?.data || error.message || "알 수 없는 오류 발생"
    );

    if (error.response?.status === 401) {
      localStorage.removeItem("refreshToken");
      alert("인증이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/login";
    }

    throw error;
  }
};

const acceptChallengeByAdmin = async (challengeId) => {
  if (!challengeId) {
    console.error("❌ challengeId가 제공되지 않았습니다.");
    throw new Error("challengeId가 제공되지 않았습니다.");
  }

  const prevRefreshToken = localStorage.getItem("refreshToken");
  if (!prevRefreshToken) {
    throw new Error("Unauthenticated");
  }

  try {
    await refreshToken(prevRefreshToken);

    const response = await client.put(
      `/application/${challengeId}`,
      {
        status: "ACCEPTED",
      },
      {
        headers: {
          Authorization: client.defaults.headers.Authorization,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "🔥 acceptChallengeByAdmin API 요청 실패:",
      error.response?.data || error.message || "알 수 없는 오류 발생"
    );

    if (error.response?.status === 401) {
      localStorage.removeItem("refreshToken");
      alert("인증이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/login";
    }

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
  getMyChallenges, // 'featture/ChallengePage'sIDPage' 브랜치에서 추가된 부분
  deleteFeedback,
  updateFeedback,
  deleteWork,
  getApplications,
  participateChallenge,
  createChallenge,
  getTopLikeWorks,
  createWork,
  saveWork,
  getSavedWork,
  deleteParticipate,
  updateWork,
  deleteChallengeByAdmin,
  deleteChallenge,
  updateChallenge,
  getApplicationsByAdmin,
  rejectedChallengeByAdmin,
  acceptChallengeByAdmin,
};

export default api;
