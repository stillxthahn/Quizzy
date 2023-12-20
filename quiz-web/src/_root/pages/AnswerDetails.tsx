import { useParams } from "react-router-dom"
import { useUserContext } from "../../context/AuthContext"
import { getUserAnswers } from "../../service/answerService"
import { useEffect, useState } from "react"
import Form from "antd/es/form/Form"
import { Radio, Space } from "antd"
import { getQuestionByTopicID } from "../../service/questionService"
import { getTopic } from "../../service/topicService"

type IAnswerList = {
    id: string;
    topicId: string;
    userId: string;
    answers: Array<IAnswer>
}

type ITopic = {
    id: string;
    name: string;
}

type IAnswer = {
    questionId: number,
    answer: number
    isCorrect: number
}

const AnswerDetails = () => {
    const currentUser = useUserContext()
    const [answers, setAnswers] = useState<IAnswerList>()
    const [topic, setTopic] = useState([])
    const [questions, setQuestions] = useState([])
    const param = useParams()
    const fetchAnswer = async () => {
        const response = await getUserAnswers(`${currentUser.id}&id=${param.id}`)
        setAnswers(response)
    }
    const fetchTopic = async () => {
        try {
            const result = await getTopic();
            setTopic(result);
        } catch (error) {
            console.error(error);
        }
    }
    const fetchQuestion = async (answers) => {
        if (answers) {
            const response = await getQuestionByTopicID(answers.topicId)
            setQuestions(response)
        }
    }
    useEffect(() => {
        fetchAnswer()
        fetchTopic()
    }, [])
    useEffect(() => {
        fetchQuestion(answers)
    }, [answers])

    console.log("ANSWER", answers)
    console.log("TOPIC", topic)
    console.log("QUESTIONS", questions)

    return (
        // <Form
        //     layout="vertical"
        // >
        //     {answers.length > 0 && questionsList.map((question: IQuestion) => (
        //         <Form.Item
        //             name={question.id}
        //             key={question.id}
        //             label={`Câu ${question.id}. ${question.question}`}
        //         >
        //             <Radio.Group key={question.id} buttonStyle="solid">
        //                 <Space direction="vertical">
        //                     {question.answers.map((answer: string, index: number) => (
        //                         <Radio.Button key={index} value={index}> {answer} </Radio.Button >
        //                     ))}
        //                 </Space>
        //             </Radio.Group>
        //         </Form.Item >
        //     ))}
        //     <Form.Item>
        //         <Button htmlType="submit">
        //             Submit
        //         </Button>
        //     </Form.Item>
        // </Form>
        <></>
    )
}

export default AnswerDetails