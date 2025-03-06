import { client } from "../client";
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

export { getFeedbacks, createFeedback, deleteFeedback, updateFeedback };
