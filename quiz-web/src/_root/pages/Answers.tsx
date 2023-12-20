import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useUserContext } from '../../context/AuthContext';
import { getUserAnswers } from '../../service/answerService';
import { getTopic } from '../../service/topicService';
import { Link, NavLink } from 'react-router-dom';

interface DataType {
    key: string;
    ID: string;
    tag: string;
    score: number;
    link: string
}

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


const Answers = () => {
    const currentUser = useUserContext()
    const [userAnswers, setUserAnswers] = useState([])
    const [topics, setTopics] = useState([])
    useEffect(() => {
        console.log("FETCH TOPIC")
        fetchTopicList()
    }, [])
    useEffect(() => {
        console.log("FETCH ANSWER")
        fectAnswerList()
    }, [])

    const fectAnswerList = async () => {
        if (currentUser.id !== "") {
            const result = await getUserAnswers(currentUser.id)
            setUserAnswers(result)
        }
    }
    const fetchTopicList = async () => {
        const result = await getTopic()
        setTopics(result)
    }

    console.log("USER", currentUser)
    console.log("ANSWERS", userAnswers)
    console.log("TOPICS", topics)

    const columns: ColumnsType<DataType> = [
        {
            key: "id",
            title: 'ID',
            dataIndex: 'ID',
            render: (text) => <a>{text}</a>,
        },
        {
            key: "tag",
            title: 'Tag',
            dataIndex: 'tag',
        },
        {
            key: "score",
            title: 'Score',
            dataIndex: 'score',
        },

        {
            key: "action",
            title: 'Action',
            render: (_, { link }) => (
                <>
                    <Link to={`${link}`} >Xem chi tiết</Link>
                </>
            ),
        },
    ];
    const findTopic = (answersTopicID: string) => {
        const topic = topics.find((topic: ITopic) => topic.id === answersTopicID)
        if (topic) {
            return topic["name"]
        }
        return ""
    }

    const calcScore = (answers: Array<IAnswer>) => {
        const correctAnswer = answers.filter((answer: IAnswer) => answer.isCorrect === 1)
        return (correctAnswer.length * 10) / answers.length
    }

    const row = userAnswers.map((answer: IAnswerList) => ({
        key: answer.id,
        ID: answer.id,
        tag: findTopic(answer.topicId),
        score: calcScore(answer.answers),
        link: answer.id
    }))

    const data: DataType[] = row;
    return (
        <>
            <div>Answers Page</div>
            <Table pagination={false} columns={columns} dataSource={data} />
        </>
    )
}

export default Answers