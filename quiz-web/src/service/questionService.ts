import { get } from "../utils/request"

export const getQuestionByTopicID = async (id: string) => {
    const result = await get(`/questions?topicId=${id}`)
    return result
}