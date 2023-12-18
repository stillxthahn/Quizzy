import { post } from "../utils/request"

export const createUserAnswers = async (data: object) => {
    const result = await post(data)
    return result
}