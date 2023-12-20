import { IUser } from "../types";
import { get } from "../utils/request";

export const getUserList = async () => {
  try {
    const result = await get("/users");
    return result;
  } catch (error: any) {
    return error
  }
}

export const getUser = async (email: string, password: string) => {
  const result = await get(`/users?email=${email}&password=${password}`);
  return result;
}

export const getCurrentUser = async (token: string) => {
  const userList = await getUserList()
  const currentUser = await userList.find((user: IUser) => user.token === token)
  return currentUser
}
