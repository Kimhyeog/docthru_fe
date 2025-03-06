import { client } from "../client";
import { refreshToken } from "../auth";

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
const getMyWork = async (challengeId) => {
  const url = `/works/${challengeId}/myWork`;
  const response = await client.get(url);
  const data = response.data;
  return data;
};

export {
  getUserMe,
  getUserData,
  getMyChallenges, // 'featture/ChallengePage'sIDPage' 브랜치에서 추가된 부분
  getApplications,
  getMyWork,
};
