import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/taskApi";

export default {
    title: 'API'
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = "ea400c50-598a-40b7-b313-293456e06d7a"
        taskAPI.getTask(id)
            .then(res=>setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = "ea400c50-598a-40b7-b313-293456e06d7a"
        const title = 'learn'
        taskAPI.createTask(id,title)
            .then(res=>setState(res.data.data.item))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "ea400c50-598a-40b7-b313-293456e06d7a";
        const taskId = "749cff29-7f35-46cd-b8c9-685a4612380e"
        taskAPI.deleteTask(todoListId,taskId)
            .then(res=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "ea400c50-598a-40b7-b313-293456e06d7a";
        let taskId = "0c3b921b-0b87-4870-84e9-c5bde7b72665";
        let obj = {
            title:'ahahahah'
        }
       taskAPI.updateTask(todoListId,taskId,obj)
            .then(res=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

