import React, { useEffect, useState } from 'react'
import { getTopic } from '../../service/topicService'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
type ITopic = {
    "id": string;
    "name": string;
}

const Topic = () => {
    const navigate = useNavigate()
    const [topicList, setTopicList] = useState([])
    const fetchTopicList = async () => {
        const result = await getTopic()
        setTopicList(result)
    }
    useEffect(() => {
        fetchTopicList()
    }, [])
    return (
        <>
            <div>Topic Page</div>
            <div>
                {topicList.map((topic: ITopic) => (
                    <Button
                        onClick={() => navigate(`/topic/${topic.id}`)}
                        key={topic.id}>
                        {topic.name}
                    </Button>
                ))}
            </div >
        </>
    )
}

export default Topic