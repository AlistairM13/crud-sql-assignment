import axios from "../../config/axios";

export type UserEntryPayload = {
  name: string;
  mobileNumber: string;
  email: string;
  address: string;
  panNumber: string;
  aadhaarNumber: string;
};

export const createUserEntry = async (user: UserEntryPayload) => {
  const response = await axios.post("/users/", user);
  return response.data;
};
