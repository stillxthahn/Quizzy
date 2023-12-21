import { useParams } from "react-router-dom"
import { useUserContext } from "../../context/AuthContext"
import { getUserAnswers } from "../../service/answerService"
import { useEffect, useState } from "react"
import Form from "antd/es/form/Form"
import { Card, Radio, Space } from "antd"
import { getQuestionByTopicID } from "../../service/questionService"
import { getTopic } from "../../service/topicService"

interface IAnswerList {
    id: string;
    topicId: string;
    userId: string;
    answers: IAnswer[]
}

type IAnswer = {
    questionId: number,
    answer: number
    isCorrect: number
}

const AnswerDetails = () => {
    const currentUser = useUserContext()
    const [answerList, setAnswerList] = useState<IAnswerList[]>()
    const [topic, setTopic] = useState([])
    const [questions, setQuestions] = useState([])
    const param = useParams()
    const fetchAnswer = async () => {
        const response = await getUserAnswers(`${currentUser.id}&id=${param.id}`)
        setAnswerList(response)
    }
    const fetchTopic = async () => {
        try {
            const result = await getTopic();
            setTopic(result);
        } catch (error) {
            console.error(error);
        }
    }
    const fetchQuestion = async () => {
        if (answerList) {
            const response = await getQuestionByTopicID(answerList![0]["topicId"])
            setQuestions(response)
        }
    }
    useEffect(() => {
        fetchAnswer()
        fetchTopic()
    }, [])
    useEffect(() => {
        fetchQuestion()
    }, [answerList])
    if (!answerList) {
        return null
    }
    console.log("ANSWER", answerList)
    console.log("TOPIC", topic)
    console.log("QUESTIONS", questions)
    // console.log("ANSWER TOPICID", answers![0].topicId!)

    const userAnswers = answerList[0]["answers"]
    console.log(userAnswers)
    console.log(userAnswers[0]["isCorrect"])

    return (
        <Space direction="vertical" size={16}>
            {questions && questions.map((question, indexQuestion) => (
                <Card
                    title={question.question}
                    extra={<p style={{ color: userAnswers[indexQuestion]["isCorrect"] === 1 ? "green" : "red", fontWeight: 500, fontSize: 16 }}>{`${userAnswers[indexQuestion]["isCorrect"] === 1 ? "Correct" : "Incorrect"}`}</p>}
                    style={{ width: 700 }}>

                    <div
                    //key={question.id}
                    //buttonStyle="solid"
                    >
                        <Space direction="vertical">
                            {question.answers.map((answer: string, index: number) => (
                                <div
                                    //autoFocus={true}
                                    className={`
                                    p-3 rounded-md border border-blue-500
                                    ${index === question["correctAnswer"] ? "border-green-500 solid bg-green-500" : ""}
                                    ${userAnswers[index]["answer"] === index && userAnswers[index]["answer"] !== question["correctAnswer"] ? "bg-red-500" : ""}
                                    `}
                                //className={userAnswers[question.id - 1]["isCorrect"] === 1 ? "bg-sky-500 hover:bg-sky-700" : ""}
                                //key={index}
                                //value={index}
                                >
                                    {answer}
                                </div >
                            ))}
                        </Space>
                    </div>
                    {/* {question.answers.map((answer) => (
                        <p>{answer}</p>
                    ))} */}
                </Card>
            ))
            }
        </Space >


    )
}

export default AnswerDetails