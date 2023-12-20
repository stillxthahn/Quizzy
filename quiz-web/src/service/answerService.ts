import { get, post } from "../utils/request"

export const createUserAnswers = async (data: object) => {
    const result = await post(data)
    return result
}

export const getUserAnswers = async (api: string) => {
    const result = await get("/answers?userId=" + api)
    return result
}
