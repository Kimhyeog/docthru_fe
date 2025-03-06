import { client } from "../client";
import { refreshToken } from "../auth";
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

export {
  deleteChallengeByAdmin,
  getApplicationsByAdmin,
  rejectedChallengeByAdmin,
  acceptChallengeByAdmin,
};
