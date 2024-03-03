import axios from "../../config/axios";

export const fetchAllUsers = async () => {
  const response = await axios.get("/users/");
  return response.data;
};

export const updateUserEntry = async (userId: string) => {
  const response = await axios.put(`/users/${userId}`);
  return response.data;
};
