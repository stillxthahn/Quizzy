import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getQuestionByTopicID } from "../../service/questionService"
import { Button, Form, Radio, Space } from "antd";
import { getUserList } from "../../service/userService";
import { createUserAnswers } from "../../service/answerService";

type IQuestion = {
    "id": string;
    "topicId": string;
    "question": string;
    "answers": Array<string>;
    "correctAnswer": string;
}
type IUser = {
    "email": string;
    "fullname": string;
    "id": string;
    "password": string;
    "token": string;
}


const Quiz = () => {
    const param = useParams()
    const [questionsList, setQuestionsList] = useState([])
    const [userList, setUserList] = useState([])
    const onFinish = async (values: any) => {
        const token = localStorage.getItem("token")
        const currentUser = userList.find((user: IUser) => user.token === token)
        const answers = Object.values(values).filter((value) => value !== undefined).map((value, index) => ({
            questionId: index + 1, answer: value
        }))
        if (currentUser && answers) {
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

    useEffect(() => {
        const fetchQuestionsList = async () => {
            const result = await getQuestionByTopicID(param.id || "")
            setQuestionsList(result)
        }
        const fetchUserList = async () => {
            const userList = await getUserList()
            setUserList(userList)
        }
        fetchUserList()
        fetchQuestionsList()
    }, [])
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
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};

export default Quiz