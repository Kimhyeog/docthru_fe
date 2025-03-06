import { client } from "../client";

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

export {
  getWork,
  getWorks,
  createLike,
  deleteLike,
  deleteWork,
  getTopLikeWorks,
  createWork,
  saveWork,
  getSavedWork,
  updateWork,
};
