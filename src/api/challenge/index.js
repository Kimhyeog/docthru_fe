import { client } from "../client";
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
export {
  getChallenge,
  getChallenges,
  participateChallenge,
  createChallenge,
  deleteParticipate,
  deleteChallenge,
  updateChallenge,
};
