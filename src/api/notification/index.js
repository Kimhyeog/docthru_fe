import { client } from "../client";
const getNotification = async () => {
  const url = "/notification";
  const response = await client.get(url);
  const data = response.data;
  return data;
};

const deleteNotificaiton = async (notificationId) => {
  const url = `/notification/${notificationId}`;
  const response = await client.delete(url);
  const data = response.data;
  return data;
};
export { getNotification, deleteNotificaiton };
