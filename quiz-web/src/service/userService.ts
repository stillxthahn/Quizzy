import { get } from "../utils/request";

export const getUserList = async () => {
  const result = await get("/users");
  return result;
}

export const getUser = async (email: string, password: string) => {
  const result = await get(`/users?email=${email}&password=${password}`);
  return result;
}
