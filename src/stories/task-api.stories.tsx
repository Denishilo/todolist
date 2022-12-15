import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/taskApi";

export default {
    title: 'API'
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = "689c1f71-6b56-46ce-8b6a-122a8e68839a"
        taskAPI.getTask(id)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = "689c1f71-6b56-46ce-8b6a-122a8e68839a"
        const title = 'learn'
        taskAPI.createTask(id, title)
            .then(res => setState(res.data.data.item))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "689c1f71-6b56-46ce-8b6a-122a8e68839a";
        const taskId = "19f1ed77-a54a-448d-9efe-6fafae830216"
        taskAPI.deleteTask(todoListId, taskId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "689c1f71-6b56-46ce-8b6a-122a8e68839a";
        let taskId = "19f1ed77-a54a-448d-9efe-6fafae830216";
        let obj = {
            title: 'ahahahah'
        }
        taskAPI.updateTask(todoListId, taskId, obj)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

