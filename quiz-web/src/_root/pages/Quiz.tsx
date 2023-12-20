import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getQuestionByTopicID } from "../../service/questionService"
import { Button, Form, Radio, Space } from "antd";
import { createUserAnswers } from "../../service/answerService";
import { IQuestion } from "../../types";
import { useUserContext } from "../../context/AuthContext";


const Quiz = () => {
    const currentUser = useUserContext()
    const param = useParams()
    console.log(currentUser)
    const [questionsList, setQuestionsList] = useState([])
    const fetchQuestionsList = async () => {
        try {
            const result = await getQuestionByTopicID(param.id || "");
            setQuestionsList(result);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {

        if (param.id) {
            fetchQuestionsList()
        }
    }, [])
    console.log(questionsList)
    const onFinish = async (values: any) => {
        const answers = Object.values(values).map((value, index) => ({
            questionId: index + 1,
            answer: value ? value : -1,
            isCorrect: value && questionsList[index]["correctAnswer"] === value ? 1 : 0
        }))
        console.log(typeof (answers[0]["questionId"]))
        console.log(typeof (answers[0]["answer"]))
        console.log(typeof (answers[0]["isCorrect"]))

        if (answers.length > 0 && currentUser["id"] !== "") {
            const result = await createUserAnswers({
                "userId": currentUser["id"],
                "topicId": Number.parseInt(param.id || ""),
                "answers": answers
            })
            if (result) {
                console.log("DA GUI THANH CONG")
            } else {
                console.log("GUI KHONG THANH CONG")
            }
        }
    }


    return (
        <Form
            onFinish={onFinish} layout="vertical"
        >
            {questionsList.length > 0 && questionsList.map((question: IQuestion) => (
                <Form.Item
                    name={question.id}
                    key={question.id}
                    label={`Câu ${question.id}. ${question.question}`}
                >
                    <Radio.Group key={question.id} buttonStyle="solid">
                        <Space direction="vertical">
                            {question.answers.map((answer: string, index: number) => (
                                <Radio.Button key={index} value={index}> {answer} </Radio.Button >
                            ))}
                        </Space>
                    </Radio.Group>
                </Form.Item >
            ))}
            <Form.Item>
                <Button htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};

export default Quiz